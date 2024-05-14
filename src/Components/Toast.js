import React from 'react';
import useDarkMode from '../Config/ColorApp';
import {Box,Text} from "native-base"
import { fonts } from '../Config/Fonts';

const CustomToast = ({message}) => {
  return (
    <Box p={3} px={6} borderRadius={'3xl'} bg={"#000"} >
      <Text color={"#fff"} fontFamily={fonts.Inter_Medium} >{message}</Text>
    </Box>
  );
};

export default CustomToast;
