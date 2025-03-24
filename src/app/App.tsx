import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import "../styles/global.css"
import  RootNavigator  from './navigation'


export default function App() {
  
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}
