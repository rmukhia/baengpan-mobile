import React from 'react';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import MyStoreScreen from './my-store-screen';
import MyProfileScreen from './my-profile-screen';
import UploadScreen from './upload-screen';

const MySectionTabs = createMaterialTopTabNavigator({
  MyProfile: {
    screen: MyProfileScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="cart"
          style={{ fontSize: 14, color: tintColor }}
          active={focused}
        />
      ),
      tabBarLabel: 'My Profile',
    },
  },
  MyStore: {
    screen: MyStoreScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon
          name="cube"
          style={{ fontSize: 14, color: tintColor }}
          active={focused}
        />
      ),
      tabBarLabel: 'My Store',
    },
  },
},
{
  initialRouteName: 'MyProfile',
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

export default createStackNavigator({
  MySectionTabs,
  UploadScreen,
}, {
  initialRouteName: 'MySectionTabs',
  headerMode: 'none',
});
