import {View, StyleSheet, Alert} from 'react-native';
import React, {useState,useContext} from 'react';
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp';
import {
  Box,
  VStack,
  Text,
  FormControl,
  Input,
  WarningOutlineIcon,
  Button,
  Image,
  Center,
  ScrollView,
  useToast
} from 'native-base';
import {fonts} from '../Config/Fonts';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import {height, width} from '../Utils/Constant';
import auth, {firebase} from '@react-native-firebase/auth';
import CustomToast from '../Components/Toast';
import { AuthContext } from '../Utils/AuthContext';
import { ThemeContext } from '../Context/ThemeContext';
export default function LoginScreen({navigation}) {
  // const {isDarkMode} = useContext(ThemeContext);
  const colors =   darkMode 
   const {setConfirmation} = useContext(AuthContext);
  const toast=useToast()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErr, setPhoneNumberErr] = useState('');
  const [loading, setLoading] = useState(false);
  //for send verification code
  const sendVerificationCode = async () => {
    setLoading(true)
    if(phoneNumber.length<10){
      setPhoneNumberErr("Phone number should be valid and 10 digit")
      setLoading(false)
    }
    else{
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        '+91' + phoneNumber,
      );
      setConfirmation(confirmation);
toast.show({
  duration: 2000,
  position: 'bottom',
  render: () => <CustomToast message="OTP sent successfully" />,
});
      setLoading(false)
      navigation.navigate('otp', {phoneNumber});
    } catch (error) {
      console.log('Error sending verification code: ', error);
    }
  };}
    
  return (
    <ScrollView bg={colors.BACKGROUND} p={4} py={2} w={'full'} h={'full'}>
      <VStack>
        <Center>
          <Image
            h={height - height / 2}
            w={width}
            alt="login"
            source={require('../assets/Images/login.png')}
          />
        </Center>
        <Box>
          <Box>
            <Text
              fontSize={28}
              color={colors.TEXT}
              fontFamily={fonts.Inter_SemiBold}>
              Login and explore!
            </Text>
            <Text color={colors.TEXT} fontFamily={fonts.Inter_SemiBold}>
              Sign in and start exploring
            </Text>
          </Box>
          <Box py={4} alignItems="center">
            <FormControl
              isRequired
              isInvalid={phoneNumberErr !== ''}
              maxW="400px">
              <FormControl.Label
                fontFamily={fonts.Inter_Medium}
                color={colors.APP_PRIMARY_LIGHT}>
                Your Mobile Number +91
              </FormControl.Label>
              <Input
                _input={{
                  borderColor: colors.LIGHT_PRIMARY,
                  borderWidth: 1,
                  color: colors.TEXT,
                  selectionColor: colors.APP_PRIMARY_LIGHT,
                  fontSize: 14,
                }}
                keyboardType="number-pad"
                _focus={{borderColor: colors.PRIMARY, borderWidth: 1}}
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {phoneNumberErr}
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
          <Button
          isLoading={loading}
            onPress={sendVerificationCode}
            _android={{
              bg:phoneNumber.length<10 ? colors.APP_PRIMARY_LIGHT:colors.PRIMARY   ,
              _text: {
                color: colors.WHITE,
                fontFamily: fonts.Inter_SemiBold,
              },
            }}>
            Send OTP
          </Button>
          <Center>
            <Text
              color={colors.APP_PRIMARY_LIGHT}
              my={1}
              fontSize="xs"
              fontFamily={fonts.Inter_SemiBold}>
              By continuing , you agree to explorify Terms of service and
              confirm that you have read our privacy ploicy
            </Text>
          </Center>
        </Box>
      </VStack>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
