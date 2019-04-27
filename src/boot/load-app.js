import React from 'react';
import {
  Font, AppLoading, Permissions, Notifications
} from 'expo';

class LoadAppScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: false,
    };
  }

  bootstrapAsync = async () => {
    // load fonts
    await Font.loadAsync({
      // eslint-disable-next-line global-require
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      // eslint-disable-next-line global-require
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });

    // const userToken = await AsyncStorage.getItem('userToken');
    this.setState({ userToken: false });
  };

  // Render any loading content that you like here
  render() {
    return (
      <AppLoading
        startAsync={this.bootstrapAsync}
        onFinish={() => {
          // eslint-disable-next-line no-console
          console.log('<<< BOOT >>> ');
          this.props.navigation.navigate(this.state.userToken ? 'AppDrawer' : 'AuthStack');
        }
        }
        // eslint-disable-next-line no-console
        onError={console.warn}
      />
    );
  }
}

export default LoadAppScreen;
