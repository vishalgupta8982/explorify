import {Box, HStack, VStack, Text, ScrollView, Image,Slider} from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import BottomBarHeader from '../Components/BottomBarHeader';
import {fonts} from '../Config/Fonts';
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp';
import { ThemeContext } from '../Context/ThemeContext';
import {
  getFirestore,
  FieldValue,
  deleteField,
} from '@react-native-firebase/firestore';
import { getAsyncStorageData } from '../Config/AsyncStorage';
import moment from 'moment';
import MyTripSkeleton from '../Components/MyTripSkeleton';
import { myTripImg } from '../Utils/Constant';
import { Alert } from 'react-native';
export default function MyTrip({navigation}) {
  const db=getFirestore()
   const {isDarkMode} = useContext(ThemeContext);
   const colors = isDarkMode ? darkMode: lightMode;
   const [data,setData]=useState([])
   const [loader,setLoader]=useState(true)
   useEffect(()=>{
fetchData()
   },[])
   const fetchData=async()=>{
    const userId = await getAsyncStorageData('userId');
   const tripsRef = db.collection(`users/${userId}/trips`);
   tripsRef.onSnapshot(
     snapshot => {
       const tripsData = [];
       snapshot.forEach(doc => {
         tripsData.push({id: doc.id, ...doc.data()});
       }); 
       console.log(tripsData,"df")
       setData(tripsData);
       setLoader(false);
     },
     error => {
       console.error('Error fetching trips:', error)
     },
   );
   }
  return (
    <ScrollView w={'full'} h={'full'} bg={colors.MAIN_BACKGROUND}>
      <Box>
        <BottomBarHeader navigation={navigation} headingText={'My Trips'} />
        <VStack padding={4}>
          <ScrollView horizontal>
            <HStack space={3}>
              {['All', 'Ongoing', 'Completed', 'Yet to Start', 'Cancelled'].map(
                item => (
                  <Box
                    p={1}
                    px={3}
                    alignItems={'center'}
                    bg={colors.BACKGROUND}>
                    <Text fontFamily={fonts.Inter_Medium} color={colors.TEXT}>
                      {item}
                    </Text>
                  </Box>
                ),
              )}
            </HStack>
          </ScrollView>
          {loader?<MyTripSkeleton/>:( 
          data.map(item => (
            <Box mt={2} borderRadius={'md'} bg={colors.BACKGROUND} pb={2}>
              <Image
                height={'150'}
                borderRadius={'md'}
                source={{
                  uri:myTripImg[Math.floor(Math.random() * 6) ]
                }}
              />
              <Text
                m={1}
                fontSize={'10'}
                p={1}
                zIndex={10}
                bg={colors.BACKGROUND}
                position={'absolute'}
                color={colors.PRIMARY}
                fontFamily={fonts.Inter_Medium}>
                Trip-completed
              </Text>
              <Box p={2}>
                <Text
                  fontSize={'sm'}
                  fontFamily={fonts.Inter_Medium}
                  color={colors.TEXT}>
                  Trip to {item.place}
                </Text>
                <Text
                  fontSize={'xs'}
                  fontFamily={fonts.Inter_Medium}
                  color={colors.APP_PRIMARY_LIGHT}>
                  Started on {moment(item.leaveDate).format('DD/MM/YYYY')}
                </Text>
                <Text
                  mt={1}
                  fontSize={'xs'}
                  fontFamily={fonts.Inter_Medium}
                  color={colors.TEXT}>
                  Your planned budget is ₹{item.budget * 100}
                </Text>
                <Slider
                  w="full"
                  maxW={'full'}
                  value={50}
                  minValue={0}
                  maxValue={100}
                  color={colors.PRIMARY}
                  accessibilityLabel="hello world"
                  step={10}>
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                </Slider>
                <Text
                  fontSize={'xs'}
                  fontFamily={fonts.Inter_Medium}
                  color={colors.TEXT}>
                  Your Spends 0
                </Text>
              </Box>
            </Box>
          )))}
        </VStack>
      </Box>
    </ScrollView>
  );
}
