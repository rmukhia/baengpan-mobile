import React from 'react';
import { View } from 'react-native';
import {
  Button, Content, Form, Header,
  Left, Right, Body, Title, Input, Item,
  Text, Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import i18n from '../../../utils/i18n';

import WrapperContainer from '../../../component/wrapper-container-component';
import FormInputWrapper from '../../../component/form-input-wrapper-component';
import validator from '../../../utils/validators';

class UploadScreen extends React.Component {
  submit() {

  }

  render() {
    const {
      numeric, alphaNumeric, required,
    } = validator;
    return (
      <WrapperContainer>
        <Content>
          <Form
            style={{
              padding: 20,
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <Field
              name="name"
              label="name"
              component={FormInputWrapper}
              validate={[alphaNumeric, required]}
            />
            <Field
              name="description"
              label="description"
              component={FormInputWrapper}
              validate={[alphaNumeric, required]}
            />
            <Field
              name="price"
              label="price"
              component={FormInputWrapper}
              validate={[numeric, required]}
            />
            <Field
              name="quantity"
              label="quantity"
              component={FormInputWrapper}
              validate={[numeric, required]}
            />
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                alignContent: 'center',
              }}
            >
              <Button
                light
                onPress={() => this.submit()}
                style={{ marginRight: 10 }}
              >
                <Text>{i18n.t('addToStore')}</Text>
              </Button>
              <Button
                light
                onPress={() => this.props.navigation.goBack()}
              >
                <Text>{i18n.t('cancel')}</Text>
              </Button>

            </View>
          </Form>
        </Content>
      </WrapperContainer>
    );
  }
}

const UploadForm = reduxForm({
  form: 'marketUpload',
})(UploadScreen);

const selector = formValueSelector('marketUpload');
export default connect(
  (state) => {
    const name = selector(state, 'name');
    const description = selector(state, 'description');
    const price = selector(state, 'price');
    const quantity = selector(state, 'quantity')
    return {
      name,
      description,
      price,
      quantity,
    };
  },
  dispatch => bindActionCreators({}, dispatch)
)(UploadForm);
