import React from 'react';
import {
  Button, Container, Content, Form, H1, Header,
  Left, Right, Input, Item, Picker,
  Text, Icon, View
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { StyleSheet } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';

import WrapperContainer from '../../component/wrapper-container-component';

import validator from '../../utils/validators';
import { loginAction } from '../../actions/account-actions';
import { loadingAction } from '../../actions/applicaiton-state-actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#eee',
  },
  inputText: {
    height: 40,
    padding: 2,
    marginBottom: 5,
    borderColor: '#eee',
    borderWidth: 1
  },
  containerBackground: {
    backgroundColor: '#eee',
  },
});


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // cId: communities.id,
      // loading: false,
      // modalVisible: false,
      // language: i18n.locale,
    };
  }


  // eslint-disable-next-line class-methods-use-this
  submit() {
    if (this.props.valid) {
      this.props.loadingAction(true);
      this.props.loginAction(this.props.username, this.props.password, this.props.pin)
        .finally(() => {
          this.props.loadingAction(false);
        });
    }
  }

  renderInput = (props) => {
    const {
      input, label, type, meta: { touched, error }
    } = props;
    let iconName;
    switch (input.name) {
      case 'password':
        iconName = 'unlock';
        break;
      case 'pin':
        iconName = 'key';
        break;
      default:
        iconName = 'person';
    }
    return (
      <Item error={error && touched}>
        <Icon active name={iconName} />
        <Input
          type={type}
          placeholder={label}
          secureTextEntry={input.name === 'password' || input.name === 'pin'}
          {...input}
        />
      </Item>
    );
  };

  render() {
    const {
      email, numeric, alphaNumeric, required, minLength6, maxLength16
    } = validator;

    return (
      <WrapperContainer loadingText="Loggin In">
        <Header transparent>
          <Left>
            <Button style={{ backgroundColor: 'white', elevation: 0 }}>
              <Icon style={{ color: 'black', marginLeft: 0, marginRight: 0 }} name="ios-people" />
              <Text style={{ color: 'black' }}>
                C00
              </Text>
            </Button>
          </Left>
          <Right />
        </Header>
        <Grid>
          <Row size={20}>
            <Content padder contentContainerStyle={styles.centerContainer}>
              <H1 style={{
                padding: '10%', marginBottom: '10%', textAlign: 'center', fontWeight: 'bold', fontSize: 35
              }}
              >
                BaengPan
              </H1>
            </Content>
          </Row>
          <Row size={80}>
            <Content
              contentContainerStyle={{
                width: '100%',
              }}
            >
              <Form style={{
                padding: 20,
                marginTop: 20,
                marginBottom: 20
              }}
              >
                <Field
                  name="email"
                  label="email"
                  component={this.renderInput}
                  validate={[email, required]}
                />
                <Field
                  name="password"
                  label="password"
                  component={this.renderInput}
                  validate={[alphaNumeric, minLength6, maxLength16, required]}
                />
                <Field
                  name="pin"
                  label="pin"
                  component={this.renderInput}
                  validate={[numeric, required]}
                />
                <Button
                  rounded
                  block
                  iconLeft
                  light
                  style={{ marginTop: 15 }}
                  onPress={() => this.submit()}
                >
                  <Icon name="log-in" />
                  <Text>"Sign In"</Text>
                </Button>
                <Button
                  rounded
                  block
                  iconLeft
                  light
                  style={{ marginTop: 15 }}
                  onPress={() => this.props.navigation.navigate('RegisterEmail')}
                >
                  <Icon name="person-add" />
                  <Text>Register</Text>
                </Button>
                <Picker
                  mode="dropdown"
                  style={{ marginTop: 15 }}
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  // selectedValue={this.state.language}
                  onValueChange={(language) => {
                    // this.props.changeLanguage(language);
                    // this.setState({ language });
                  }}
                >
                  <Picker.Item label="Eng" value="en" />
                  <Picker.Item label="ไทย" value="th" />
                </Picker>
              </Form>

            </Content>
          </Row>
        </Grid>
      </WrapperContainer>
    );
  }
}

let LoginForm = reduxForm({
  form: 'login',
  initialValues: {
    email: 'ab@a.com',
    password: '12345678',
    pin: '9382',
  },
})(LoginScreen);

const selector = formValueSelector('login');
LoginForm = connect((state) => {
  const username = selector(state, 'email');
  const password = selector(state, 'password');
  const pin = selector(state, 'pin');
  return { username, password, pin };
})(LoginForm);

const LoginContainer = connect(
  state => ({
    Account: state.Account,
    LanguageSwitch: state.LanguageSwitch,
    CommunitySwitch: state.CommunitySwitch,
  }),
  dispatch => bindActionCreators({ loginAction, loadingAction }, dispatch)
)(LoginForm);
export default LoginContainer;
