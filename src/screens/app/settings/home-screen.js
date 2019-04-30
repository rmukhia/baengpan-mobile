import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button
} from 'native-base';

import { logoutAction } from '../../../actions/account-actions';

// eslint-disable-next-line react/prefer-stateless-function
class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logoutAction();
    this.props.navigation.navigate('AuthStack');
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <ListItem icon onPress={this.logout}>
            <Left>
              <Button style={{ backgroundColor: '#FF9501' }}>
                <Icon active name="log-out" />
              </Button>
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: '#007AFF' }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}


export default connect(
  () => ({
  }),
  dispatch => bindActionCreators({
    logoutAction,
  }, dispatch),
)(SettingsScreen);
