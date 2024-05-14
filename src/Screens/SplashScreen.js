import { View, Text,StyleSheet, Image } from 'react-native'
import { Box, HStack,VStack } from 'native-base';
import React,{useContext, useEffect} from 'react'
import  { fonts } from '../Config/Fonts';
import ColorsApp, { darkMode, lightMode } from '../Config/ColorApp';
import * as Animatable from 'react-native-animatable';
import { height } from '../Utils/Constant';
import { ThemeContext } from '../Context/ThemeContext';
import { getData } from '../Config/AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SplashScreen({navigation}) {
     const colors =  darkMode 
    const fadeIn = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    };
   useEffect(() => {
     const timer = setTimeout(async () => {
       try {
         const userId = await AsyncStorage.getItem('userId');
         if (userId) {
          console.log(userId)
           navigation.replace('BottomTabNavigation');
         } else {
           navigation.replace('login');
         }
       } catch (error) {
         console.error('Error while checking user:', error);
       }
     }, 2000);
     return () => clearTimeout(timer);
   }, []);

  return (
    <VStack w={"full"} h={"full"} bg={colors.BACKGROUND} >
      <View
        style={[
          styles.design,
          {backgroundColor: colors.PRIMARY, borderColor: colors.LIGHT_PRIMARY},
        ]}></View>
      <HStack h={height*0.85}  justifyContent={"center"}  alignItems={"center"}>
        <Image
          style={styles.logo}
          source={require('../assets/Images/logo.png')}
        />
        <Animatable.Text
          animation={fadeIn}
          duration={1000}  
          style={[styles.appName, {color: colors.PRIMARY}]}>
          Explorify
        </Animatable.Text>
      </HStack>
      <Box
        style={[styles.bottomDesign, {backgroundColor: colors.TEXT}]}></Box>
    </VStack>
  );
}
const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  design: {
    height: 200,
    width: 200,
    borderBottomRightRadius: 200,
    position: 'absolute',
    borderBottomWidth: 7,
    borderEndWidth: 7,
  },
  logo: {
    height: 50,
    width: 50,
  },
  appName: {
    fontFamily: fonts.Inter_SemiBold,
    color: '#000',
    fontSize: 30,
    letterSpacing: 4,
  },
  bottomDesign:{
    width:"50%",
    height:5,
    alignSelf:"center",
  }
});