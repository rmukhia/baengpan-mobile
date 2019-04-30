import { createStackNavigator } from 'react-navigation';

import LoginScreen from './login-screen';
import RegisterEmailScreen from './register-email-screen';
import RegisterScreen from './register-screen';

// Auth Stack
export default createStackNavigator({
  LoginScreen,
  RegisterEmailScreen, // First the user has to register email to receive token
  RegisterScreen, // Then the user can register other details
},
{
  initialRouteName: 'LoginScreen',
  headerMode: 'none',
});
