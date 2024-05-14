 import { Alert, StyleSheet,Switch,RefreshControl } from 'react-native'
import { Avatar, Box, HStack, VStack,Text, IconButton, ScrollView, Pressable, Spinner, Button } from 'native-base'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { darkMode, lightMode } from '../Config/ColorApp'
import BottomBarHeader from '../Components/BottomBarHeader'
import { fonts } from '../Config/Fonts'
import Icon from "react-native-vector-icons/FontAwesome"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import {getFirestore} from '@react-native-firebase/firestore';
import AntDesign from "react-native-vector-icons/AntDesign"
import { profileData } from '../Utils/Constant'
import { ThemeContext } from '../Context/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAsyncStorageData } from '../Config/AsyncStorage'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
export default function Profile({navigation}) {
  const [data,setData]=useState([])
  const [loader,setLoader]=useState(true)
     const db = getFirestore();
  const [refreshing,setRefreshing]=useState(false)
  const myCallback = useCallback(() => {
    fetchData();
  }, [fetchData]);
  useFocusEffect(myCallback);
  
    const {isDarkMode,toggleTheme}=useContext(ThemeContext)
    const colors = isDarkMode ? darkMode : lightMode
    const fetchData=async()=>{
      const userId=await getAsyncStorageData('userId')
      console.log(userId)
      const data=await db.collection('users').doc(userId).get()
      console.log(data.data())
      setLoader(false)
      setData(data.data())
    }
      useEffect(() => {
        fetchData();
      }, []);
    const handleProfile=(item)=>{
      if(item=='Log Out'){
        AsyncStorage.clear()
        navigation.replace('login')
      }
      else if(item=='Notifications'){
        navigation.navigate("Notification")
      }
    }
    const onRefresh = () => {
      setRefreshing(true);
       fetchData()
      setRefreshing(false);
    };
  return (
    <Box bg={colors.MAIN_BACKGROUND} w={'full'} h={'full'}>
      {loader ? (
        <Spinner size={30} height={'100%'} color={colors.PRIMARY} />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <BottomBarHeader
            navigation={navigation}
            headingText={data?.firstName + ' ' + data?.lastName}
          />
          <VStack p={2} h={'1/6'} bg={colors.BACKGROUND}>
            <HStack space={4} alignItems={'center'}>
              <Avatar
                size={'lg'}
                source={{uri:data?.profileImg}}
              >
                {data.firstName?.charAt(0).toUpperCase() +
                  data.lastName?.charAt(0).toUpperCase()}
              </Avatar>
              <VStack>
                <Text color={colors.TEXT} style={styles.TextProfile}>
                  {data?.userName == null ? '-' : data?.userName}
                </Text>
                <Text color={colors.TEXT} style={styles.TextProfile}>
                  {data?.phoneNumber}
                </Text>
                <Text color={colors.TEXT} style={styles.TextProfile}>
                  Member since:{moment(data.createdAt).format('DD MMM YYYY')}
                </Text>
              </VStack>
            </HStack>
            <Button
              onPress={() => navigation.navigate('editProfile')}
              variant={'solid'}
              fontFamily={fonts.Inter_SemiBold}
              color={colors.TEXT}
              bg={colors.PRIMARY}
              p={2}
              size={'md'}
              my={4}>
              Edit Profile
            </Button>
          </VStack>
          <VStack mb={'8'} p={2}>
            <Text
              mb={2}
              px={2}
              fontSize={'md'}
              fontFamily={fonts.Inter_Medium}
              color={colors.TEXT}>
              My Account
            </Text>
            <HStack
              h={'12'}
              alignItems={'center'}
              space={2}
              bg={colors.BACKGROUND}
              px={3}
              py={2}
              my={1}>
              <Icon name="moon-o" size={18} color={colors.TEXT} />
              <Text color={colors.TEXT} fontFamily={fonts.Inter_Medium}>
                Dark Mode
              </Text>
              <Switch
                style={{marginLeft: 'auto'}}
                trackColor={{
                  true: colors.PRIMARY,
                  false: colors.APP_PRIMARY_LIGHT,
                }}
                ml={'auto'}
                thumbColor={
                  isDarkMode ? colors.PRIMARY : colors.APP_PRIMARY_LIGHT
                }
                onChange={toggleTheme}
                value={isDarkMode}
              />
            </HStack>
            {profileData.map(item => (
              <Pressable
                px={3}
                my={1}
                bg={colors.BACKGROUND}
                onPress={() => handleProfile(item.name)}
                _pressed={{bg: colors.MAIN_BACKGROUND}}>
                <HStack h={'12'} alignItems={'center'} space={2}>
                  <MaterialIcon
                    name={item.icon}
                    size={18}
                    color={colors.TEXT}
                  />
                  <Text color={colors.TEXT} fontFamily={fonts.Inter_Medium}>
                    {item.name}
                  </Text>
                  <AntDesign
                    marginLeft="auto"
                    name="right"
                    size={14}
                    p={0}
                    color={colors.APP_PRIMARY_LIGHT}
                  />
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </ScrollView>
         
      )}
    </Box>
  );
}
const styles = StyleSheet.create({
  TextProfile:{
    fontSize:13,
    fontFamily:fonts.Inter_SemiBold
  }
});