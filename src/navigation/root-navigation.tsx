import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MoviesDetailsScreen from '../screens/movie-details-screen';
import SeatLayoutScreen from '../screens/seat-layout-screen';
import SeatSelectScreen from '../screens/seat-select-screen';
import RootStackParamList from '../types/navigation-types/root-stack';
import TabNavigator from './tab-navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator
        initialRouteName="BottomTab"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="BottomTab" component={TabNavigator} />
          <Stack.Screen name="SeatLayoutScreen" component={SeatLayoutScreen} />
          <Stack.Screen name="SeatSelectScreen" component={SeatSelectScreen} />
          <Stack.Screen
            name="MoviesDetailsScreen"
            component={MoviesDetailsScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
