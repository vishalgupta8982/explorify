// BottomNavigation.js
import React, { useContext } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Home from '../Screens/Home';
import useDarkMode, { darkMode, lightMode } from '../Config/ColorApp';
import Profile from '../Screens/Profile';
import MyTrip from '../Screens/MyTrip';
import AddTrip from '../Screens/AddTrip';
import { ThemeContext } from '../Context/ThemeContext';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
     const {isDarkMode} = useContext(ThemeContext);
     const colors = isDarkMode ?darkMode :lightMode;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: { backgroundColor: colors.BACKGROUND } ,
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
           else if (route.name === 'MyTrip') {
             iconName = focused ? 'train' : 'train-outline';
           }
           else if (route.name === 'Add')
           {
             iconName = focused ? 'add-circle' : 'add-circle-outline';
           }
             return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor:colors.PRIMARY ,
        inactiveTintColor: colors.TEXT,
      }}
      >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MyTrip" component={MyTrip} />  
      <Tab.Screen name="Add" component={AddTrip} />  
      <Tab.Screen name="Profile" component={Profile} />  
    </Tab.Navigator>
  );
};

export default BottomNavigation;
