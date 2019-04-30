import React from 'react';
import {
  Button, Content, Form, H1, Header,
  Left, Right, Input, Item, Picker,
  Text, Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { StyleSheet } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import i18n, { setLocalization } from '../../utils/i18n';
import WrapperContainer from '../../component/wrapper-container-component';
import FormInputWrapper from '../../component/form-input-wrapper-component';
import validator from '../../utils/validators';
import { loadingAction, setApplicationPropertyAction } from '../../actions/applicaiton-state-actions';
import { loginAction } from '../../actions/account-actions';


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
  // eslint-disable-next-line class-methods-use-this
  submit() {
    if (this.props.valid) {
      this.props.loadingAction(true);
      this.props.loginAction(this.props.email, this.props.password, this.props.pin)
        .finally(() => {
          this.props.loadingAction(false);
          this.props.navigation.navigate('AppTabs');
        });
    }
  }

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
            <Content
              scrollEnabled={false}
              padder
              contentContainerStyle={styles.centerContainer}>
              <H1 style={{
                padding: '10%', marginBottom: '10%', textAlign: 'center', fontWeight: 'bold', fontSize: 35
              }}
              >
                {i18n.t('title')}
              </H1>
            </Content>
          </Row>
          <Row size={80}>
            <Content
              scrollEnabled={false}
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
                  component={FormInputWrapper}
                  validate={[email, required]}
                />
                <Field
                  name="password"
                  label="password"
                  component={FormInputWrapper}
                  validate={[alphaNumeric, minLength6, maxLength16, required]}
                />
                <Field
                  name="pin"
                  label="pin"
                  component={FormInputWrapper}
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
                  <Text>Sign In</Text>
                </Button>
                <Button
                  rounded
                  block
                  iconLeft
                  light
                  style={{ marginTop: 15 }}
                  onPress={() => this.props.navigation.navigate('RegisterEmailScreen')}
                >
                  <Icon name="person-add" />
                  <Text>Register</Text>
                </Button>
                <Picker
                  mode="dropdown"
                  style={{ marginTop: 15 }}
                  iosIcon={<Icon name="arrow-dropdown" />}
                  selectedValue={this.props.locale}
                  onValueChange={(locale) => {
                    setLocalization(locale).then(() => { this.props.setApplicationPropertyAction({ locale }); });
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

const LoginForm = reduxForm({
  form: 'login',
  initialValues: {
    email: 'ab@a.com',
    password: '12345678',
    pin: '9382',
  },
})(LoginScreen);

const selector = formValueSelector('login');
export default connect(
  (state) => {
    const email = selector(state, 'email');
    const password = selector(state, 'password');
    const pin = selector(state, 'pin');
    return {
      email,
      password,
      pin,
      locale: state.application.locale,
      LanguageSwitch: state.LanguageSwitch,
      CommunitySwitch: state.CommunitySwitch,
    };
  },
  dispatch => bindActionCreators({
    loginAction, loadingAction, setApplicationPropertyAction
  }, dispatch)
)(LoginForm);
