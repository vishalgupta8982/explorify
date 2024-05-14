import React, { useContext } from 'react';
import {Vibration} from 'react-native';
import {View, Text, Box, HStack, IconButton} from 'native-base';
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp';
import {fonts} from '../Config/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../Context/ThemeContext';
export default function BottomBarHeader({headingText,navigation}) {
  const {isDarkMode} = useContext(ThemeContext);
  const colors = isDarkMode ? darkMode :lightMode;
  return (
    <Box w={'full'} bg={colors.BACKGROUND}>
      <HStack
        pl={5}
        px={2}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text
          fontSize={'lg'}
          color={colors.TEXT}
          fontFamily={fonts.Inter_Medium}>
          {headingText}
        </Text>
        <HStack alignItems={'center'}>
          <IconButton
            key={'unstyled'}
            // onPress={() => navigation.navigate('Profile')}
            borderRadius={'full'}
            _pressed={{
              bgColor: colors.LIGHT_MAIN_BACKGROUND,
            }}
            icon={
              <Ionicons
                size={22}
                padding={3}
                color={colors.TEXT}
                name="search-sharp"
              />
            }
          />
          <IconButton
            onPress={() => navigation.navigate('Notification')}
            borderRadius={'full'}
            key={'unstyled'}
            _pressed={{
              bgColor: colors.LIGHT_MAIN_BACKGROUND,
            }}
            icon={
              <Icon
                size={22}
                padding={3}
                color={colors.TEXT}
                name="bell-outline"
              />
            }
          />
        </HStack>
      </HStack>
    </Box>
  );
}
