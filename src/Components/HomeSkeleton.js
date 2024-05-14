import {View} from 'react-native';
import React, { useContext } from 'react';
import {
  Box,
  VStack,
  Text,
  HStack,
  Button,
  ScrollView,
  Image,
  Skeleton
} from 'native-base';
import BottomBarHeader from '../Components/BottomBarHeader';
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../Config/Fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {homeDataDiscover} from '../Utils/Constant';
import { ThemeContext } from '../Context/ThemeContext';
export default function HomeSkeleton() {
  const {isDarkMode} = useContext(ThemeContext);
  const colors = isDarkMode ? darkMode: lightMode;
  return (
    <ScrollView>
      <Box w={'full'} h={'full'} bg={colors.MAIN_BACKGROUND}>
        <VStack p={4}>
          <Skeleton
            endColor={colors.DARK_BACKGROUND}
            startColor={colors.BACKGROUND}
          />
          <Skeleton
            startColor={colors.BACKGROUND}
            height={'5'}
            endColor={colors.DARK_BACKGROUND}
            padding={'0'}
            w={'2/5'}
            mt={2}
          />
          <HStack justifyContent={'space-between'}>
            {homeDataDiscover.map(item => (
              <VStack alignItems={'center'} my={4}>
                <Skeleton
                  endColor={colors.DARK_BACKGROUND}
                  startColor={colors.BACKGROUND}
                  size={'12'}
                />
              </VStack>
            ))}
          </HStack>
          <HStack mt={2} justifyContent={'space-between'} alignItems={'center'}>
            <Skeleton
              endColor={colors.DARK_BACKGROUND}
              startColor={colors.BACKGROUND}
              padding={'0'}
              height={'5'}
              w={'2/5'}
            />
            <Skeleton
              endColor={colors.DARK_BACKGROUND}
              startColor={colors.BACKGROUND}
              padding={'0'}
              height={'5'}
              w={'1/5'}
            />
          </HStack>
          <ScrollView horizontal w={'full'}>
            <HStack space={2} my={4} w={'full'}>
              <Skeleton
                endColor={colors.DARK_BACKGROUND}
                w={'48'}
                startColor={colors.BACKGROUND}
                h={'24'}
              />
              <Skeleton
                endColor={colors.DARK_BACKGROUND}
                w={'48'}
                startColor={colors.BACKGROUND}
                h={'24'}
              />
              <Skeleton
                endColor={colors.DARK_BACKGROUND}
                w={'48'}
                startColor={colors.BACKGROUND}
                h={'24'}
              />
            </HStack>
          </ScrollView>
          <HStack mt={2} alignItems={'center'}>
            <Skeleton
              endColor={colors.DARK_BACKGROUND}
              startColor={colors.BACKGROUND}
              padding={'0'}
              height={'5'}
              w={'2/5'}
            />
            <Skeleton
              endColor={colors.DARK_BACKGROUND}
              startColor={colors.BACKGROUND}
              padding={'0'}
              height={'5'}
              w={'1/5'}
            />
          </HStack>
          <ScrollView horizontal w={'full'}>
            <HStack space={2} my={2} w={'full'}>
              <Skeleton
                endColor={colors.DARK_BACKGROUND}
                w={'48'}
                startColor={colors.BACKGROUND}
                h={'24'}
              />
              <Skeleton
                endColor={colors.DARK_BACKGROUND}
                w={'48'}
                startColor={colors.BACKGROUND}
                h={'24'}
              />
              <Skeleton
                endColor={colors.DARK_BACKGROUND}
                w={'48'}
                startColor={colors.BACKGROUND}
                h={'24'}
              />
            </HStack>
          </ScrollView>
          <HStack mt={2} alignItems={'center'}>
            <Skeleton
              startColor={colors.BACKGROUND}
              endColor={colors.DARK_BACKGROUND}
              padding={'0'}
              height={'5'}
              w={'2/5'}
            />
            <Skeleton
              startColor={colors.BACKGROUND}
              endColor={colors.DARK_BACKGROUND}
              padding={'0'}
              height={'5'}
              w={'1/5'}
            />
          </HStack>
          <ScrollView horizontal w={'full'}>
            <HStack space={2} my={2} w={'full'}>
              <Skeleton
                w={'48'}
                startColor={colors.BACKGROUND}
                endColor={colors.DARK_BACKGROUND}
                h={'48'}
              />
              <Skeleton
                w={'48'}
                startColor={colors.BACKGROUND}
                endColor={colors.DARK_BACKGROUND}
                h={'48'}
              />
              <Skeleton
                w={'48'}
                startColor={colors.BACKGROUND}
                endColor={colors.DARK_BACKGROUND}
                h={'48'}
              />
            </HStack>
          </ScrollView>
        </VStack>
      </Box>
    </ScrollView>
  );
}
