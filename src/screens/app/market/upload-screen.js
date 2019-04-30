import React from 'react';
import {
  Button, Content, Form, Header,
  Left, Right, Body, Title, Input, Item,
  Text, Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import WrapperContainer from '../../../component/wrapper-container-component';
import FormInputWrapper from '../../../component/form-input-wrapper-component';
import validator from '../../../utils/validators';

class UploadScreen extends React.Component {
  submit() {

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

export default UploadScreen;
