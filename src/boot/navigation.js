import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer, createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'native-base';
// Load screen
import LoadAppScreen from './load-app';
// Auth screens
import AuthStack from '../screens/auth';
// App screens
import HomeScreen from '../screens/app/home-screen';

import MarketStack from '../screens/app/market';

import SettingsStack from '../screens/app/settings';


// App stacks, the structure of app is defined here
const AppTabs = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name="home" color={tintColor} active={focused} />,
    },
  },
  Market: {
    screen: MarketStack,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name="cart" color={tintColor} active={focused} />,
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name="settings" color={tintColor} active={focused} />,
    },
  },
},
{
  initialRouteName: 'Home',
});


// Root stack
// switchNavigator to load only 1 screen at a time
export default createAppContainer(createSwitchNavigator({
  LoadAppScreen, // load the app
  AuthStack, // Authentication stack
  AppTabs, // App stack
},
{
  initialRouteName: 'LoadAppScreen',
}));
