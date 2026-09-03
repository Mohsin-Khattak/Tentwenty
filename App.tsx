import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/config/axios-interceptor';
import { navigationRef } from './src/navigation/navigation-ref';
import { RootNavigator } from './src/navigation/root-navigation';

const App = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
