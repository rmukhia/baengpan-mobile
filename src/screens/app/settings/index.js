import { createStackNavigator } from 'react-navigation';
import SettingsScreen from './home-screen';

export default createStackNavigator({
  SettingsScreen,
},
{
  initialRouteName: 'SettingsScreen',
  headerMode: 'none',
});
