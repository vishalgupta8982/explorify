import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import BEACH from '../assets/Images/Beach.svg'
import CAMPING from '../assets/Images/camping.svg'
import CLUBING from '../assets/Images/Club.svg'
import FISHING from '../assets/Images/Fishing.svg'
import HIKING from '../assets/Images/Hking.svg'
export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;
export const profileData = [
  {name: 'Notifications', icon: 'east'},
  {name: 'Change Password', icon: 'lock-outline'},
  {name: "FAQ'S", icon: 'question-mark'},
  {name: 'Privacy Policy', icon: 'privacy-tip'},
  {name: 'Contact Support', icon: 'contact-support'},
  {name: 'Delete My Account', icon: 'delete-outline'},
  {name: 'Log Out', icon: 'logout'},
];
export const homeDataDiscover = [
  {name: 'Beach', icon: BEACH},
  {name: 'Camping', icon: CAMPING},
  {name: 'Clubing', icon: CLUBING},
  {name: 'Fishing', icon: FISHING},
  {name: 'Hiking', icon: HIKING},
];
export const myTripImg = [
  'https://cdn.mos.cms.futurecdn.net/xaycNDmeyxpHDrPqU6LmaD.jpg',
  'https://content.jwplatform.com/thumbs/AhG5YttF-720.jpg',
  'https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE1egjR4b1Fk8hvhx-iFap-ZjzKxgEi0AEphgmWF_nGw&s',
  'https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww',
  'https://travelogyindia.b-cdn.net/storage/app/upload/akshardham-temple-tour.jpg',
];
export const AllCity = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

