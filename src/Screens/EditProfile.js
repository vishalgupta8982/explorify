 import { Avatar, Box, FormControl, VStack,Input,Select,CheckIcon, ScrollView, Button, Spinner, Toast, Actionsheet,Text,Icon,MaterialIcons, Stack } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { darkMode, lightMode } from '../Config/ColorApp'
import Storage from '@react-native-firebase/storage'
import { ThemeContext } from '../Context/ThemeContext'
import AntDesign from "react-native-vector-icons/AntDesign"
import { fonts } from '../Config/Fonts'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  getFirestore,
  FieldValue,
  deleteField,
} from '@react-native-firebase/firestore';
import { getAsyncStorageData } from '../Config/AsyncStorage'
import CustomToast from '../Components/Toast'
import { height, width } from '../Utils/Constant'
export default function EditProfile({navigation}) {
     const db = getFirestore();
     const userRef = db.collection('users');
    const [profileData,setProfileData]=useState({firstName:'',lastName:'',gender:'',userName:''})
    const [loader,setLoader]=useState(true)
    const [openAS,setOpenAS]=useState(false)
    const [userId,setUserId]=useState('')
     const [filePath, setFilePath] = useState({});
     const {isDarkMode}=useContext(ThemeContext)
    const colors = isDarkMode ? darkMode :lightMode
    useEffect(()=>{
        fetchData()
    },[uploadImg])
     const fetchData = async () => {
       const userId = await getAsyncStorageData('userId');
       setUserId(userId);
       const data = await userRef.doc(userId).get();
       setProfileData(data.data());
       setLoader(false);
     };
     const chooseImage = type => {
       let options = {
         mediaType: type,
         maxWidth: 300,
         maxHeight: 550,
         quality: 1,
       };
       launchImageLibrary(options, response => {
         console.log('Response =', response);

         if (response.didCancel) {
           alert('User cancelled camera picker');
           return;
         } else if (response.errorCode == 'camera_unavailable') {
           alert('Camera not available on device');
           return;
         } else if (response.errorCode == 'permission') {
           alert('Permission not satisfied');
           return;
         } else if (response.errorCode == 'others') {
           alert(response.errorMessage);
           return;
         }
         setOpenAS(!openAS)
         uploadImg(response)
       });
     };
     const uploadImg=async(item)=>{
        setLoader(true)
  const filename = item.assets[0].fileName;
  const reference = Storage().ref(filename);
  const pathToFile = item.assets[0].uri;
  await reference.putFile(pathToFile);
  const url=await Storage().ref(filename).getDownloadURL()
  const data = await userRef.doc(userId).update({profileImg: url});
  Toast.show({
    duration: 2000,
    position: 'bottom',
    render: () => <CustomToast message="Upload Succesfully" />,
  });
  fetchData()
  setLoader(false);
  }
const handleChangeText = (key, value) => {
  setProfileData(prevProfileData => ({
    ...prevProfileData,
    [key]: value,
  }));
};
 const saveInformation=async()=>{
    setLoader(true)
    const userNameSnapshot = await userRef
      .where('userName', '==', profileData.userName)
      .get();
      console.log(userNameSnapshot)
    if (
      !userNameSnapshot.empty &&
      !userNameSnapshot.docs.some(doc => doc.id === userId)
    ) {
      Toast.show({
        duration: 2000,
        position: 'bottom',
        render: () => <CustomToast message="Username already exists!" />,
      });
      setLoader(false)
      return;
    }
    const data=await db.collection('users').doc(userId).set(profileData)
     Toast.show({
       duration: 2000,
       position: 'bottom',
       render: () => <CustomToast message="Saved Succesfully" />,
     });
     setLoader(false)
 }
 const deleteProfile=async()=>{
await userRef.doc(userId).update({
  profileImg: deleteField(),
});
setOpenAS(!openAS)
await fetchData()
 Toast.show({
   duration: 2000,
   position: 'bottom',
   render: () => <CustomToast message="Deleted Succesfully" />,
 });
 }
  return (
    <ScrollView h={'full'} w={'full'} bg={colors.MAIN_BACKGROUND}>
      <Header navigation={navigation} headingText={'Edit Profile'} />
      {loader && (
        <Spinner
          size={30}
          top={'50%'}
          left={width / 2 - 20}
          position={'absolute'}
          color={colors.PRIMARY}
        />
      )}
      <Box>
        <VStack p={4}>
          <Avatar
            alignSelf={'center'}
            size={'2xl'}
            source={{uri: profileData?.profileImg}}>
            {profileData.firstName?.charAt(0).toUpperCase() +
              profileData.lastName?.charAt(0).toUpperCase()}
          </Avatar>
          <Text
            my={2}
            onPress={() => setOpenAS(!openAS)}
            fontFamily={fonts.Inter_Medium}
            color={colors.PRIMARY}
            textAlign={'center'}>
            Edit Picture
          </Text>
          <VStack>
            <FormControl my={1} maxW="400px">
              <FormControl.Label>First Name</FormControl.Label>
              <Input
                fontSize={'sm'}
                fontFamily={fonts.Inter_Regular}
                selectionColor={colors.APP_PRIMARY_LIGHT}
                color={colors.TEXT}
                _focus={{
                  borderColor: colors.PRIMARY,
                  borderWidth: 1,
                  selectionColor: colors.APP_PRIMARY_LIGHT,
                }}
                placeholder="First Name"
                value={profileData.firstName}
                onChangeText={text => handleChangeText('firstName', text)}
              />
            </FormControl>
            <FormControl my={1} maxW="400px">
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                fontSize={'sm'}
                fontFamily={fonts.Inter_Regular}
                color={colors.TEXT}
                _focus={{
                  borderColor: colors.PRIMARY,
                  borderWidth: 1,
                  selectionColor: colors.APP_PRIMARY_LIGHT,
                }}
                placeholder="Last Name"
                selectionColor={colors.APP_PRIMARY_LIGHT}
                value={profileData.lastName}
                onChangeText={text => handleChangeText('lastName', text)}
              />
            </FormControl>
            <FormControl my={1} maxW="400px">
              <FormControl.Label>UserName</FormControl.Label>
              <Input
                fontSize={'sm'}
                fontFamily={fonts.Inter_Regular}
                color={colors.TEXT}
                selectionColor={colors.APP_PRIMARY_LIGHT}
                _focus={{
                  borderColor: colors.PRIMARY,
                  borderWidth: 1,
                  selectionColor: colors.APP_PRIMARY_LIGHT,
                }}
                placeholder="UserName"
                value={profileData.userName}
                onChangeText={text => handleChangeText('userName', text)}
              />
            </FormControl>
            <FormControl my={1} maxW="400px">
              <FormControl.Label>
                Mobile Number (Not Editable)
              </FormControl.Label>
              <Input
                readOnly
                fontSize={'sm'}
                fontFamily={fonts.Inter_Regular}
                value={profileData.phoneNumber}
                color={colors.TEXT}
                _focus={{borderColor: colors.PRIMARY, borderWidth: 1}}
                placeholder="Mobile Number"
              />
            </FormControl>
            <FormControl my={1} maxW="400px">
              <FormControl.Label>Gender</FormControl.Label>
              <Select
                px={4}
                minWidth="200"
                color={colors.TEXT}
                accessibilityLabel="Choose Gender"
                placeholder="Choose Gender"
                fontFamily={fonts.Inter_Regular}
                selectedValue={profileData.gender}
                onValueChange={value =>
                  setProfileData(prevProfileData => ({
                    ...prevProfileData,
                    gender: value,
                  }))
                }
                dropdownIcon={
                  <AntDesign
                    name="down"
                    padding={4}
                    marginRight={8}
                    color={colors.PRIMARY}
                    size={14}
                  />
                }
                _selectedItem={{
                  bg: colors.PRIMARY,
                  endIcon: <CheckIcon size={2} />,
                }}
                fontSize={'sm'}
                mt="1">
                <Select.Item label="Male" value="male" />
                <Select.Item label="Female" value="female" />
                <Select.Item label="Prefer Not To Say" value="notPrefer" />
              </Select>
            </FormControl>
            <Button
              onPress={saveInformation}
              variant={'solid'}
              fontFamily={fonts.Inter_SemiBold}
              color={colors.WHITE}
              bg={colors.PRIMARY}
              p={2}
              size={'md'}
              my={4}>
              Save Information
            </Button>
          </VStack>
        </VStack>
        <Actionsheet
          isOpen={openAS}
          onClose={() => setOpenAS(!openAS)}
          size="full">
          <Actionsheet.Content bg={colors.BACKGROUND}>
            <Actionsheet.Item
              onPress={() => chooseImage('photo')}
              bg={colors.BACKGROUND}
              _pressed={{bg: colors.MAIN_BACKGROUND}}
              startIcon={
                <AntDesign name="picture" color={colors.TEXT} size={22} />
              }>
              <Text fontFamily={fonts.Inter_Medium} color={colors.TEXT}>
                New Picture
              </Text>
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={deleteProfile}
              bg={colors.BACKGROUND}
              _pressed={{bg: colors.MAIN_BACKGROUND}}
              startIcon={
                <AntDesign name="delete" color={'#ff0000'} size={22} />
              }>
              <Text fontFamily={fonts.Inter_Medium} color="#ff0000">
                Remove Picture
              </Text>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Box>
    </ScrollView>
  );
}