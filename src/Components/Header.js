import React, { useContext } from 'react'
import { Vibration } from 'react-native'
import {View,Text, Box, HStack, IconButton} from "native-base"
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp'
import { fonts } from '../Config/Fonts'
import Icon from "react-native-vector-icons/AntDesign"
import { ThemeContext } from '../Context/ThemeContext'
export default function Header({headingText,navigation}) {
 const {isDarkMode} = useContext(ThemeContext);
 const colors = isDarkMode ? darkMode: lightMode;
  return (
    <Box p={1} w={'full'} bg={colors.BACKGROUND}>
      <HStack alignItems={'center'}>
        <IconButton
          key={'unstyled'}
          onPress={()=>navigation.goBack()}
          _pressed={{
            bgColor: colors.LIGHT_MAIN_BACKGROUND,
          }}
          icon={
            <Icon size={18} padding={3} color={colors.TEXT} name="arrowleft" />
          }
        />
        <Text
          fontSize={'lg'}
          color={colors.TEXT}
          fontFamily={fonts.Inter_Medium}>
          {headingText}
        </Text>
      </HStack>
    </Box>
  );
}