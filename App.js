import {
  NativeBaseProvider,
} from 'native-base';
import React  from 'react';
import MainStack from './src/Navigation/MainStack';
import { ThemeProvider } from './src/Context/ThemeContext';
import { AuthContext, AuthProvider } from './src/Utils/AuthContext';
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NativeBaseProvider>
          <MainStack />
        </NativeBaseProvider>
      </AuthProvider>
    </ThemeProvider>
  ); 
}
