import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import useDarkMode from '../Config/ColorApp';
import BottomTabNavigation from './BottomTabNavigation';
import HomeScreen from '../Screens/Home';
import Notification from '../Screens/Notification';
import Profile from '../Screens/Profile';
import OtpScreen from '../Screens/Otp';
import LoginScreen from '../Screens/Login';
import EditProfile from '../Screens/EditProfile';
import TrendingInIndia from '../Screens/TrendingInIndia';
const Stack = createNativeStackNavigator();

const MainStack = () => {
    
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
          />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="editProfile" component={EditProfile} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="otp" component={OtpScreen} />
          <Stack.Screen name="indiaTrending" component={TrendingInIndia} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
