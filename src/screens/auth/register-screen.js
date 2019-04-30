import React from 'react';
import {
  Button, Content, Form, Header,
  Left, Right, Body, Title, Input, Item,
  Text, Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import i18n from '../../utils/i18n';
import WrapperContainer from '../../component/wrapper-container-component';
import FormInputWrapper from '../../component/form-input-wrapper-component';
import validator from '../../utils/validators';
import { loadingAction, errorAction } from '../../actions/applicaiton-state-actions';
import { registerAction } from '../../actions/account-actions';

class RegisterScreen extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  submit() {
    const {
      email, token, password, confirmPassword, firstname, lastname
    } = this.props;

    if (this.props.valid) {
      if (password === confirmPassword) {
        this.props.loadingAction(true);
        this.props.registerAction(email, token, password, firstname, lastname)
          .then(() => Promise.resolve())
          .finally(() => {
            this.props.loadingAction(false);
          });
      } else {
        // do some password not matched error
        this.props.errorAction(i18n.t('alr_err3'));
      }
    } else {
      // do props invalid error
      this.props.errorAction(i18n.t('alr_err1'));
    }
  }

  render() {
    const {
      email, numeric, alphaNumeric, required, minLength8, maxLength16
    } = validator;
    return (
      <WrapperContainer>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              register
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form
            style={{
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
              name="token"
              label="token"
              component={FormInputWrapper}
              validate={[numeric, required]}
            />
            <Field
              name="password"
              label="password"
              component={FormInputWrapper}
              validate={[alphaNumeric, minLength8, maxLength16, required]}
            />
            <Field
              name="confirmPassword"
              label="confirmPassword"
              component={FormInputWrapper}
              validate={[alphaNumeric, minLength8, maxLength16, required]}
            />
            <Field
              name="firstname"
              label="First Name"
              component={FormInputWrapper}
              validate={[alphaNumeric, maxLength16, required]}
            />
            <Field
              name="lastname"
              label="Last Name"
              component={FormInputWrapper}
              validate={[alphaNumeric, maxLength16, required]}
            />
            <Button
              rounded
              block
              light
              style={{ marginTop: 15 }}
              onPress={() => this.submit()}
            >
              <Text>register</Text>
            </Button>
          </Form>
        </Content>
      </WrapperContainer>
    );
  }
}


const RegisterForm = reduxForm({
  form: 'register',
})(RegisterScreen);


const selector = formValueSelector('register');
export default connect(
  (state) => {
    const email = selector(state, 'email');
    const token = selector(state, 'token');
    const password = selector(state, 'password');
    const confirmPassword = selector(state, 'confirmPassword');
    const firstname = selector(state, 'firstname');
    const lastname = selector(state, 'lastname');
    return {
      email,
      token,
      password,
      confirmPassword,
      firstname,
      lastname,
      initialValues: {
        email: state.account.email,
        token: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
      },
    };
  },
  dispatch => bindActionCreators({ loadingAction, errorAction, registerAction }, dispatch)
)(RegisterForm);
