import React from 'react';
import {
  Button, Content, Form, Header,
  Left, Right, Body, Title, Input, Item,
  Text, Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import WrapperContainer from '../../component/wrapper-container-component';
import FormInputWrapper from '../../component/form-input-wrapper-component';
import validator from '../../utils/validators';
import { loadingAction } from '../../actions/applicaiton-state-actions';
import { registerEmailAction } from '../../actions/account-actions';

class RegisterEmailScreen extends React.Component {
  submit() {
    if (this.props.valid) {
      this.props.loadingAction(true);
      this.props.registerEmailAction(this.props.email)
        .then(() => {
          this.props.navigation.navigate('RegisterScreen');
          return Promise.resolve();
        })
        .finally(() => {
          this.props.loadingAction(false);
        });
    }
  }

  render() {
    const { email, required } = validator;
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
              {'Register'}
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{
            padding: 20,
            marginTop: 20,
            marginBottom: 20
          }}
          >
            <Field
              name="email"
              label="Email"
              component={FormInputWrapper}
              validate={[email, required]}
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

const RegisterEmailForm = reduxForm({
  form: 'registerEmail',
  initialValues: {
    email: '',
  },
})(RegisterEmailScreen);

const selector = formValueSelector('registerEmail');
export default connect(
  (state) => {
    const email = selector(state, 'email');
    return {
      email,
    };
  },
  dispatch => bindActionCreators({ loadingAction, registerEmailAction }, dispatch),
)(RegisterEmailForm);
