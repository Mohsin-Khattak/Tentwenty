import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabParamList from '../types/navigation-types/bottom-tab';
import DashboardTab from '../screens/dashboard-tab';
import WatchTab from '../screens/watch-tab';
import MediaTab from '../screens/media-tab';
import MoreTab from '../screens/more-tab';

import { DashboardIcon, WatchIcon, MediaIcon, MoreIcon } from '../assets/icons';
import { colors } from '../config/colors';

const Tab = createBottomTabNavigator<TabParamList>();

const ACTIVE_COLOR = colors.white;
const INACTIVE_COLOR = colors.oldlavender;

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

          tabBarIcon: ({ color }) => {
            if (route.name === 'DashboardTab') {
              return <DashboardIcon fill={color} />;
            }

            if (route.name === 'WatchTab') {
              return <WatchIcon fill={color} />;
            }

            if (route.name === 'MediaTab') {
              return <MediaIcon fill={color} />;
            }

            if (route.name === 'MoreTab') {
              return <MoreIcon fill={color} />;
            }

            return null;
          },
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
          component={WatchTab}
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
    backgroundColor: colors.darkpurple, // Tab bar ke neeche ka background color fix karne ke liye
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

    paddingTop: 10,
    paddingBottom: 25, // iPhone Home Indicator spacing
  },

  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});
