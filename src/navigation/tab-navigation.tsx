import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import TabParamList from '../types/navigation-types/bottom-tab';
import DashboardTab from '../screens/dashboard-tab';

const Tab = createBottomTabNavigator();
const BottomTab = createNativeStackNavigator<TabParamList>();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <BottomTab.Screen name="DashboardTab" component={DashboardTab} />
    </Tab.Navigator>
  );
};
export default TabNavigator;
