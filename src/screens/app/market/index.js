import { createStackNavigator } from 'react-navigation';
import MarketScreen from './home-screen';
import MarketUploadScreen from './upload-screen';

export default createStackNavigator({
  MarketScreen,
  MarketUploadScreen,
},
{
  initialRouteName: 'MarketScreen',
  headerMode: 'none',
});
