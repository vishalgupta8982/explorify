import { View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../Components/Header'
import { Box, VStack,Text, HStack, Button, Stack, ScrollView } from 'native-base';
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp';
import { fonts } from '../Config/Fonts';
import { ThemeContext } from '../Context/ThemeContext';
import { nativeViewGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';

export default function Notification({navigation}) {
    const {isDarkMode} = useContext(ThemeContext);
    const colors=isDarkMode?darkMode:lightMode
  return (
    <ScrollView bg={colors.MAIN_BACKGROUND} w={'full'} h={"full"} >
        <Header navigation={navigation} headingText={'Notifications'} />
        <VStack
          p={4}
          style={{borderWidth: 0.5, borderColor: colors.LIGHTER_PRIMARY}}
          borderRadius={2}
          m={2}
          bg={colors.BACKGROUND}>
          <HStack justifyContent={'space-between'}>
            <Text
              w={'75%'}
              fontFamily={fonts.Inter_Medium}
              fontSize={'sm'}
              color={colors.TEXT}>
              New trip created: get ready
            </Text>
            <Text
              fontFamily={fonts.Inter_Medium}
              fontSize={'xs'}
              p={1}
              color={colors.APP_PRIMARY_LIGHT}>
              4 days ago
            </Text>
          </HStack>
          <Text
            fontFamily={fonts.Inter_Medium}
            fontSize={'xs'}
            color={colors.APP_PRIMARY_LIGHT}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa
            autem porro exercitationem ea similique.
          </Text>
          <Stack mt={'auto'} alignContent={'end'} alignItems={'flex-end'}>
            <Button
              size="sm"
              p={1}
              variant="ghost"
              _text={{
                fontFamily: fonts.Inter_SemiBold,
              }}
              color={colors.LIGHT_PRIMARY}>
              View details
            </Button>
          </Stack>
        </VStack>
    </ScrollView>
  );
}