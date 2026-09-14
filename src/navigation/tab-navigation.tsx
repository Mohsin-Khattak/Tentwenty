import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  DashboardActiveIcon,
  DashboardIcon,
  MediaActiveIcon,
  MediaIcon,
  MoreActiveIcon,
  MoreIcon,
  WatchIcon,
  WatchInactiveIcon,
} from '../assets/icons';

import { colors } from '../config/colors';
import { mvs } from '../config/metrices';
import DashboardTab from '../screens/dashboard-tab';
import MediaTab from '../screens/media-tab';
import MoreTab from '../screens/more-tab';
import TabParamList from '../types/navigation-types/bottom-tab';
import { WatchStackNavigator } from './watch-navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const ACTIVE_COLOR = colors.white;
const INACTIVE_COLOR = colors.oldlavender;

const renderTabBarIcon = (routeName: keyof TabParamList, focused: boolean) => {
  switch (routeName) {
    case 'DashboardTab':
      return focused ? <DashboardActiveIcon /> : <DashboardIcon />;

    case 'WatchTab':
      return focused ? <WatchIcon /> : <WatchInactiveIcon />;

    case 'MediaTab':
      return focused ? <MediaActiveIcon /> : <MediaIcon />;

    case 'MoreTab':
      return focused ? <MoreActiveIcon /> : <MoreIcon />;

    default:
      return null;
  }
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Tab.Navigator
        initialRouteName="WatchTab"
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,

          tabBarStyle: [
            styles.tabBar,
            {
              paddingBottom: insets.bottom + mvs(10),
              height: 60 + insets.bottom,
            },
          ],

          tabBarLabelStyle: styles.tabBarLabel,

          tabBarIcon: ({ focused }) => renderTabBarIcon(route.name, focused),
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
    </SafeAreaView>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  tabBar: {
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
  },

  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});
