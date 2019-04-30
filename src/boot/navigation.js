import React from 'react';
import {
  createSwitchNavigator, createAppContainer, createStackNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon, Header } from 'native-base';
// Load screen
import LoadAppScreen from './load-app';
// Auth screens
import AuthStack from '../screens/auth';
// Custom header for app screens
import MainHeader from '../component/main-header-component';
// App screens
import HomeScreen from '../screens/app/home-screen';

import MarketTabs from '../screens/app/market';

import MySectionTabs from '../screens/app/my-section';

import SettingsStack from '../screens/app/settings';


// App stacks, the structure of app is defined here
const AppTabs = createMaterialBottomTabNavigator({
  Market: {
    screen: MarketTabs,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="cart"
          style={{ color: tintColor }}
          active={focused}
        />
      ),
    },
  },
  Hub: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="contacts"
          style={{ color: tintColor }}
          active={focused}
        />
      ),
    },
  },
  Me: {
    screen: MySectionTabs,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="contact"
          style={{ color: tintColor }}
          active={focused}
        />
      ),
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="menu"
          style={{ color: tintColor }}
          active={focused}
        />
      ),
    },
  },
},
{
  initialRouteName: 'Market',
  labeled: false,
  shifting: true,
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

/* The reason we are using the navigator is because we need
* consistent header between tabs */
const AppSwitch = createStackNavigator({
  AppTabs,
},
{
  headerMode: 'float',
  defaultNavigationOptions: {
    header: (<MainHeader />)
  }
});


// Root stack
// switchNavigator to load only 1 screen at a time
export default createAppContainer(createSwitchNavigator({
  LoadAppScreen, // load the app
  AuthStack, // Authentication stack
  AppTabs: AppSwitch, // App stack
},
{
  initialRouteName: 'LoadAppScreen',
}));
