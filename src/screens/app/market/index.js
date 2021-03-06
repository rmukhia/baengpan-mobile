import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import AllScreen from './all-screen';
import ProductsScreen from './products-screen';
import ServicesScreen from './services-screen';

export default createMaterialTopTabNavigator({
  Market: {
    screen: AllScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="cart"
          style={{ fontSize: 14, color: tintColor }}
          active={focused}
        />
      ),
      tabBarLabel: 'All',
    },
  },
  Products: {
    screen: ProductsScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="cube"
          style={{ fontSize: 14, color: tintColor }}
          active={focused}
        />
      ),
      tabBarLabel: 'Products',
    },
  },
  Services: {
    screen: ServicesScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="hammer"
          style={{ fontSize: 14, color: tintColor }}
          active={focused}
        />
      ),
      tabBarLabel: 'Services',
    },
  },
},
{
  initialRouteName: 'Market',
  tabBarOptions: {
    // showIcon: true,
    // showLabel: false,
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 14,
      padding: 0,
      margin: 0,
    },
    style: {
      backgroundColor: 'white',
      maxHeight: 50,
    },
    indicatorStyle: {
      backgroundColor: 'black',
    },
    activeTintColor: '#333',
    inactiveTintColor: '#aaa',
    allowFontScaling: true,
  },
});
