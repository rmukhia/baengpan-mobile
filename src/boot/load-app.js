import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Font, AppLoading, Permissions, Notifications
} from 'expo';
import { AsyncStorage } from 'react-native';
import AsyncStorageKeys from '../constants/async-storage-keys';
// eslint-disable-next-line no-unused-vars
import i18n, { initializeLocalize } from '../utils/i18n';
import { setApplicationPropertyAction } from '../actions/application-state-actions';
import { setAccountPropertyAction } from '../actions/account-actions';

class LoadAppScreen extends React.Component {
  bootstrapAsync = async () => {
    // load fonts
    await Font.loadAsync({
      // eslint-disable-next-line global-require
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      // eslint-disable-next-line global-require
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });

    /* This sets the languauge of the application */
    const locale = await initializeLocalize();
    this.props.setApplicationPropertyAction({ locale });

    /* This sets the user token */
    const userToken = await AsyncStorage.getItem(AsyncStorageKeys.USERTOKEN);
    if (userToken) {
      this.props.setApplicationPropertyAction({ loggedIn: true });
      this.props.setAccountPropertyAction({ userToken });
    }
  };

  render() {
    return (
      <AppLoading
        startAsync={this.bootstrapAsync}
        onFinish={() => {
          // eslint-disable-next-line no-console
          console.log('<<< BOOT >>> ');
          this.props.navigation.navigate(this.props.loggedIn ? 'AppTabs' : 'AuthStack');
        }}
        // eslint-disable-next-line no-console
        onError={console.warn}
      />
    );
  }
}

export default connect(
  state => ({
    loggedIn: state.application.loggedIn,
  }),
  dispatch => bindActionCreators({
    setAccountPropertyAction,
    setApplicationPropertyAction
  }, dispatch),
)(LoadAppScreen);
