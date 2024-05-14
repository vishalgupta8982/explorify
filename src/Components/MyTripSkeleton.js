import {
  Box,
  HStack,
  VStack,
  Text,
  ScrollView,
  Image,
  Slider,
  Skeleton,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {fonts} from '../Config/Fonts';
import useDarkMode, {darkMode, lightMode} from '../Config/ColorApp';
import {ThemeContext} from '../Context/ThemeContext';
import { width } from '../Utils/Constant';
 
export default function MyTripSkeleton({navigation}) {
  const {isDarkMode} = useContext(ThemeContext);
  const colors = isDarkMode ? darkMode : lightMode;
   
  return (
    <ScrollView w={'full'} h={'full'} bg={colors.MAIN_BACKGROUND}>
      <Box>
        <VStack  >
            {[1,2,3].map((item)=>( 
          <Box mt={2} borderRadius={'md'} pb={2}>
            <Skeleton
              startColor={colors.BACKGROUND}
              height={'160'}
              endColor={colors.DARK_BACKGROUND}
              padding={'0'}
              mt={2}
            />
            <Box p={2}>
              <Skeleton
                startColor={colors.BACKGROUND}
                height={'3'}
                width={'130'}
                endColor={colors.DARK_BACKGROUND}
              />
              <Skeleton
                startColor={colors.BACKGROUND}
                height={'3'}
                width={'160'}
                mt={2}
                endColor={colors.DARK_BACKGROUND}
              />
              <Skeleton
                startColor={colors.BACKGROUND}
                height={'3'}
                width={'190'}
                mt={2}
                endColor={colors.DARK_BACKGROUND}
              />
              <Skeleton
                startColor={colors.BACKGROUND}
                height={'1'}
                width={width-100}
                mt={2}
                endColor={colors.DARK_BACKGROUND}
              />
            </Box>
          </Box>))}
        </VStack>
      </Box>
    </ScrollView>
  );
}
