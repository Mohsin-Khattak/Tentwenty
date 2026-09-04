import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStackParamList from '../types/navigation-types/root-stack';
import TabNavigator from './tab-navigation';
import MoviesDetailsScreen from '../screens/movie-details-screen';
import SearchScreen from '../screens/search-screen';
import SeatLayoutScreen from '../screens/seat-layout-screen';
import SeatSelectScreen from '../screens/seat-select-screen';

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
          {/* <Stack.Screen name="SearchScreen" component={SearchScreen} /> */}
        </Stack.Group>
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

// Added default export so both import styles work
export default RootNavigator;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
