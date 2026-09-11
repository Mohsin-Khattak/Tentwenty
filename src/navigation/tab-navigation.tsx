import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DashboardTab from '../screens/dashboard-tab';
import MediaTab from '../screens/media-tab';
import MoreTab from '../screens/more-tab';
import TabParamList from '../types/navigation-types/bottom-tab';

import { DashboardIcon, MediaIcon, MoreIcon, WatchIcon } from '../assets/icons';
import { colors } from '../config/colors';
import { mvs } from '../config/metrices';
import { WatchStackNavigator } from './watch-navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const ACTIVE_COLOR = colors.white;
const INACTIVE_COLOR = colors.oldlavender;

// Helper function moved outside the component to prevent re-creation on every render
const renderTabBarIcon = (routeName: keyof TabParamList, color: string) => {
  switch (routeName) {
    case 'DashboardTab':
      return <DashboardIcon fill={color} />;
    case 'WatchTab':
      return <WatchIcon fill={color} />;
    case 'MediaTab':
      return <MediaIcon fill={color} />;
    case 'MoreTab':
      return <MoreIcon fill={color} />;
    default:
      return null;
  }
};

const TabNavigator = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="WatchTab"
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,

          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,

          tabBarIcon: ({ color }) => renderTabBarIcon(route.name, color),
        })}
      >
        <Tab.Screen
          name="DashboardTab"
          component={DashboardTab}
          options={{
            tabBarLabel: 'DashBoard',
          }}
        />

        <Tab.Screen
          name="WatchTab"
          component={WatchStackNavigator}
          options={{
            tabBarLabel: 'Watch',
          }}
        />

        <Tab.Screen
          name="MediaTab"
          component={MediaTab}
          options={{
            tabBarLabel: 'Media',
          }}
        />

        <Tab.Screen
          name="MoreTab"
          component={MoreTab}
          options={{
            tabBarLabel: 'More',
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkpurple,
  },

  tabBar: {
    height: 85,
    backgroundColor: colors.darkpurple,

    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,

    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    paddingTop: mvs(10),
    paddingBottom: 25,
  },

  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});
