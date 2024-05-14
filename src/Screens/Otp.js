 import { ScrollView,Box, Text,Button, Toast } from 'native-base'
import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp'
import Icon from "react-native-vector-icons/AntDesign"
import { fonts } from '../Config/Fonts'
import OTPTextView from 'react-native-otp-textinput';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"
import { AuthContext } from '../Utils/AuthContext'
import CustomToast from '../Components/Toast'
import { ThemeContext } from '../Context/ThemeContext';
export default function OtpScreen({route, navigation}) {
  //  const {isDarkMode} = useContext(ThemeContext);
   const colors =   darkMode  
   const {confirmation} = useContext(AuthContext);
  const {phoneNumber} = route.params;
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const confirmVerificationCode = async () => {
setLoading(true)
    try {
     await confirmation.confirm(verificationCode);
      const currentUser = auth().currentUser;
     const userSnapshot = await firestore()
       .collection('users')
       .where('phoneNumber', '==', currentUser.phoneNumber)
       .get();
       Toast.show({
         duration: 2000,
         position: 'bottom',
         render: () => <CustomToast message="Login Succesfully" />,
       });
        AsyncStorage.setItem('userId', auth().currentUser.uid);
     if (userSnapshot.empty) {
       await firestore().collection('users').doc(auth().currentUser.uid).set({
         phoneNumber: currentUser.phoneNumber,
         userName:phoneNumber+"@explorify",
         createdAt: firestore.FieldValue.serverTimestamp(),
       });
       console.log('User information saved successfully.');
     } else {
       console.log('Phone number is already registered');
     }
     navigation.navigate("BottomTabNavigation")
    setLoading(false);
    } catch (error) {
      Toast.show({
        duration: 2000,
        position: 'bottom',
        render: () => <CustomToast message="Incorrect OTP" />,
      });
       setLoading(false);
      console.error('Failed to verify code', error);
    }
  };
  
  return (
    <ScrollView bg={colors.BACKGROUND} p={4} py={2} w={'full'} h={'full'}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrowleft"
        size={24}
        color={colors.APP_PRIMARY_LIGHT}
      />
      <Box py={2} rounded="lg">
        <Text
          py={2}
          fontSize="2xl"
          fontFamily={fonts.Inter_SemiBold}
          color={colors.TEXT}>
          Verification code
        </Text>
        <Text
          fontSize="md"
          py={2}
          color={colors.APP_PRIMARY_LIGHT}
          fontFamily={fonts.Inter_Medium}>
          We have sent the verification code to your mobile number +91
          {phoneNumber}
        </Text>
        <OTPTextView
          textInputStyle={[styles.inputView, {color: colors.TEXT}]}
          offTintColor={colors.SECONDARY}
          tintColor={colors.PRIMARY}
          inputCount={6}
          handleTextChange={setVerificationCode}
          keyboardType="numeric"
        />
        <Button
        isLoading={loading}
          onPress={
            verificationCode.length === 6 ? confirmVerificationCode:undefined  }
          my={4}
          _pressed={{
            bg: colors.APP_PRIMARY_LIGHT,
          }}
          _android={{

            bg:  verificationCode.length === 6 ?colors.PRIMARY:colors.APP_PRIMARY_LIGHT,
            _text: {
              color: colors.WHITE,
              fontFamily: fonts.Inter_SemiBold,
            },
          }}>
          Confirm
        </Button>
      </Box>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  inputView: {
    height: 40,
    width: 40,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#1abaff',
    fontSize:14
  },
   
});