import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from '@/shared/stores/stores';
import "../styles/global.css";
import RootNavigator from './navigation';
import Toast from 'react-native-toast-message';


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Provider store={store}>
          <RootNavigator />
          <Toast />
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
