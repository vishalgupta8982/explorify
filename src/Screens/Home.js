import { View } from 'react-native'
import React, {useContext, useState} from 'react';
import {ThemeContext} from '../Context/ThemeContext';
import { Box, VStack,Text, HStack, Button, ScrollView, Image } from 'native-base'
import BottomBarHeader from '../Components/BottomBarHeader'
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../Config/Fonts'
 import FontAwesome from 'react-native-vector-icons/FontAwesome'
 import Feather from "react-native-vector-icons/Feather"
import { homeDataDiscover } from '../Utils/Constant'
import HomeSkeleton from '../Components/HomeSkeleton';
export default function HomeScreen({navigation}) {
  const[loader,setLoader]=useState(true)
  setTimeout(()=>{
    setLoader(false)
  },2000)
 const {isDarkMode} = useContext(ThemeContext);
 const colors = isDarkMode ? darkMode: lightMode;
  return (
    <ScrollView>
      {loader ? (
        <HomeSkeleton />
      ) : (
        <Box w={'full'} h={'full'} bg={colors.MAIN_BACKGROUND}>
          <BottomBarHeader navigation={navigation} headingText={'HomeScreen'} />
          <VStack p={4}>
            <HStack
              borderWidth={1}
              borderColor={colors.LIGHTER_PRIMARY}
              bg={colors.BACKGROUND}
              p={2}>
              <Text
                fontFamily={fonts.Inter_Medium}
                color={colors.APP_PRIMARY_LIGHT}>
                What's your next adventure?
              </Text>
              <Ionicons
                size={18}
                marginLeft="auto"
                padding={3}
                color={colors.APP_PRIMARY_LIGHT}
                name="search-sharp"
              />
            </HStack>
            <Text
              fontFamily={fonts.Inter_SemiBold}
              mt={2}
              color={colors.TEXT}
              fontSize={'md'}>
              Discover by interests
            </Text>
            <HStack justifyContent={'space-between'}>
              {homeDataDiscover.map(item => (
                <VStack alignItems={'center'} my={4}>
                  <item.icon fill={colors.TEXT} />
                  <Text
                    fontFamily={fonts.Inter_Regular}
                    color={colors.TEXT}
                    fontSize={'10'}
                    mt={1}>
                    {item.name}
                  </Text>
                </VStack>
              ))}
            </HStack>
            <HStack mt={2} alignItems={'center'}>
              <Text
                fontFamily={fonts.Inter_SemiBold}
                color={colors.TEXT}
                fontSize={'md'}>
                Your upcoming trip
              </Text>
              <Button
                size="md"
                p={1}
                ml={'auto'}
                variant="ghost"
                _text={{
                  fontFamily: fonts.Inter_SemiBold,
                }}
                color={colors.LIGHT_PRIMARY}>
                View details
              </Button>
            </HStack>
            <ScrollView horizontal w={'full'}>
              <HStack space={2} my={2} w={'full'}>
                <Box w={'48'} p={4} bg={colors.BACKGROUND} h={'24'}>
                  <FontAwesome name="rupee" color={colors.PRIMARY} size={22} />
                  <Text
                    fontFamily={fonts.Inter_Medium}
                    my={1}
                    color={colors.TEXT}>
                    Add an Expense
                  </Text>
                </Box>
                <Box w={'48'} p={4} bg={colors.BACKGROUND} h={'24'}>
                  <Feather name="user-plus" color={colors.PRIMARY} size={22} />
                  <Text
                    fontFamily={fonts.Inter_Medium}
                    my={1}
                    color={colors.TEXT}>
                    Invite a Friend
                  </Text>
                </Box>
                <Box w={'48'} p={4} bg={colors.BACKGROUND} h={'24'}>
                  <Feather name="camera" color={colors.PRIMARY} size={22} />
                  <Text
                    fontFamily={fonts.Inter_Medium}
                    my={1}
                    color={colors.TEXT}>
                    Save a Moment
                  </Text>
                </Box>
              </HStack>
            </ScrollView>
            <HStack mt={2} alignItems={'center'}>
              <Text
                fontFamily={fonts.Inter_SemiBold}
                color={colors.TEXT}
                fontSize={'md'}>
                Explore the World
              </Text>
              <Button
                size="md"
                p={1}
                ml={'auto'}
                variant="ghost"
                _text={{
                  fontFamily: fonts.Inter_SemiBold,
                }}
                color={colors.LIGHT_PRIMARY}>
                See More
              </Button>
            </HStack>
            <ScrollView horizontal w={'full'}>
              <HStack space={2} my={2} w={'full'}>
                <Box
                  w={'48'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bg={colors.BACKGROUND}
                  h={'40'}>
                  <Image
                    h={'40'}
                    w={'48'}
                    style={{objectFit: 'cover', opacity: 0.7}}
                    alt="india"
                    source={{
                      uri: 'https://media.istockphoto.com/id/898467608/photo/the-india-gate-in-delhi.jpg?s=612x612&w=0&k=20&c=gXUaUcAJf7TD8VZ1UvBfNGU0SNNzqg-xuIx_eXgL1OM=',
                    }}
                  />
                  <Text
                    fontFamily={fonts.Inter_Medium}
                    position={'absolute'}
                    my={1}
                    fontSize={'lg'}
                    color={colors.TEXT}>
                    India
                  </Text>
                </Box>
                <Box
                  w={'48'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bg={colors.BACKGROUND}
                  h={'40'}>
                  <Image
                    h={'40'}
                    w={'48'}
                    style={{objectFit: 'cover', opacity: 0.7}}
                    alt="india"
                    source={{
                      uri: 'https://assets.vogue.com/photos/589131f158aa89a00d541e52/master/pass/5-kyoto-japan.jpg',
                    }}
                  />
                  <Text
                    fontFamily={fonts.Inter_Medium}
                    position={'absolute'}
                    my={1}
                    fontSize={'lg'}
                    color={colors.TEXT}>
                    Japan
                  </Text>
                </Box>
                <Box
                  w={'48'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bg={colors.BACKGROUND}
                  h={'40'}>
                  <Image
                    h={'40'}
                    w={'48'}
                    style={{objectFit: 'cover', opacity: 0.7}}
                    alt="india"
                    source={{
                      uri: 'https://a.cdn-hotels.com/gdcs/production172/d459/3af9262b-3d8b-40c6-b61d-e37ae1aa90aa.jpg',
                    }}
                  />
                  <Text
                    fontFamily={fonts.Inter_Medium}
                    position={'absolute'}
                    my={1}
                    fontSize={'lg'}
                    color={colors.TEXT}>
                    Bangkok
                  </Text>
                </Box>
              </HStack>
            </ScrollView>
            <HStack mt={2} alignItems={'center'}>
              <Text
                fontFamily={fonts.Inter_SemiBold}
                color={colors.TEXT}
                fontSize={'md'}>
                Trending in India
              </Text>
              <Button
                onPress={() => navigation.navigate('indiaTrending')}
                size="md"
                p={1}
                ml={'auto'}
                variant="ghost"
                _text={{
                  fontFamily: fonts.Inter_SemiBold,
                }}
                color={colors.LIGHT_PRIMARY}>
                See More
              </Button>
            </HStack>
            <ScrollView horizontal w={'full'}>
              <HStack space={2} my={2} w={'full'}>
                <Box
                  w={'48'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bg={colors.BACKGROUND}
                  h={'40'}>
                  <Image
                    h={'40'}
                    w={'48'}
                    style={{objectFit: 'cover', opacity: 0.7}}
                    alt="india"
                    source={{
                      uri: 'https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Delhi.jpg',
                    }}
                  />
                  <Text
                    fontFamily={fonts.Inter_Medium}
                    position={'absolute'}
                    my={1}
                    fontSize={'lg'}
                    color={colors.TEXT}>
                    Red Fort Delhi
                  </Text>
                </Box>
                <Box
                  w={'48'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bg={colors.BACKGROUND}
                  h={'40'}>
                  <Image
                    h={'40'}
                    w={'48'}
                    style={{objectFit: 'cover', opacity: 0.7}}
                    alt="india"
                    source={{
                      uri: 'https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/mysore-palace.jpg',
                    }}
                  />
                  <Text
                    fontFamily={fonts.Inter_Medium}
                    position={'absolute'}
                    my={1}
                    fontSize={'lg'}
                    color={colors.TEXT}>
                    Mysore
                  </Text>
                </Box>
                <Box
                  w={'48'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bg={colors.BACKGROUND}
                  h={'40'}>
                  <Image
                    h={'40'}
                    w={'48'}
                    style={{objectFit: 'cover', opacity: 0.7}}
                    alt="india"
                    source={{
                      uri: 'https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Hawa-Mahal-Palace-Jaipur.jpg',
                    }}
                  />
                  <Text
                    fontFamily={fonts.Inter_Medium}
                    position={'absolute'}
                    my={1}
                    fontSize={'lg'}
                    color={colors.TEXT}>
                    Jaipur
                  </Text>
                </Box>
              </HStack>
            </ScrollView>
          </VStack>
        </Box>
      )}
    </ScrollView>
  );
}