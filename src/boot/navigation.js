import {
  createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator,
} from 'react-navigation';
// Load screen
import LoadAppScreen from './load-app';
// Auth screens
import LoginScreen from '../screens/auth/login-screen';
// App screens
import HomeScreen from '../screens/app/home-screen';


// Auth Stack
const AuthStack = createStackNavigator({
  LoginScreen,
},
{
  initialRouteName: 'LoginScreen',
  headerMode: 'none',
});

// App stacks, the structure of app is defined here
const AppDrawer = createDrawerNavigator({
  HomeScreen,
},
{
  initialRouteName: 'HomeScreen',
});


// Root stack
// switchNavigator to load only 1 screen at a time
export default createAppContainer(createSwitchNavigator({
  LoadAppScreen, // load the app
  AuthStack, // Authentication stack
  AppDrawer, // App stack
},
{
  initialRouteName: 'LoadAppScreen',
}));
