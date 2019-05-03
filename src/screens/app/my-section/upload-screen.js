import { ImagePicker, Permissions } from 'expo';
import React from 'react';
import {
  View, StyleSheet, Dimensions, Image
} from 'react-native';
import {
  Button, Content, Form, Text,
} from 'native-base';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import i18n from '../../../utils/i18n';
import WrapperContainer from '../../../component/wrapper-container-component';
import FormInputWrapper from '../../../component/form-input-wrapper-component';
import validator from '../../../utils/validators';

import { uploadToMyStoreAction } from '../../../actions/my-store-action';

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width - 40,
    height: Dimensions.get('screen').width - 40,
    borderWidth: 2,
    borderColor: '#eee'
  },
  form: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  },
  marginTop: {
    marginTop: 20,
  },
});

class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.menu = null;
    this.setMenuRef = this.setMenuRef.bind(this);
    this.getFromCamera = this.getFromCamera.bind(this);
    this.getFromGallery = this.getFromGallery.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  setMenuRef(ref) {
    this.menu = ref;
  }

  /* ask permission for camera roll */
  async getFromGallery() {
    this.hideMenu();
    const permissionResult = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (permissionResult.status !== 'granted') return;
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!imageResult.cancelled) this.setState({ image: imageResult });
  }

  /* ask persission for camera roll plus camera */
  async getFromCamera() {
    this.hideMenu();
    const permissionResult = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (permissionResult.status !== 'granted') return;
    const imageResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!imageResult.cancelled) this.setState({ image: imageResult });
  }

  hideMenu() {
    this.menu.hide();
  }

  showMenu() {
    this.menu.show();
  }


  submit() {
    if (this.props.valid) {
      this.props.uploadToMyStoreAction(
        this.props.productName,
        this.props.description,
        this.props.price,
        this.props.quantity,
        0, // product type
        this.state.image,
      );
    }
  }


  render() {
    const {
      numeric, alphaNumeric, required,
    } = validator;
    const { image } = this.state;

    return (
      <WrapperContainer>
        <Content>
          <Form style={styles.form}>
            <Field
              name="productName"
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
            {image && 
              (<Image source={{ uri: image }} style={[styles.image, styles.marginTop]} />)}
            <View style={styles.marginTop}>
              <Menu
                ref={this.setMenuRef}
                styles={styles.marginTop}
                button={(
                  <Button
                    block
                    light
                    onPress={this.showMenu}
                  >
                    <Text>Upload Image</Text>
                  </Button>
                )}
              >
                <MenuItem onPress={this.getFromGallery}>Gallery</MenuItem>
                <MenuDivider />
                <MenuItem onPress={this.getFromCamera}>Camera</MenuItem>
              </Menu>
            </View>
            <View
              style={[{
                flexDirection: 'row',
              }, styles.marginTop]}
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
    const productName = selector(state, 'productName');
    const description = selector(state, 'description');
    const price = selector(state, 'price');
    const quantity = selector(state, 'quantity');
    return {
      productName,
      description,
      price,
      quantity,
    };
  },
  dispatch => bindActionCreators({ uploadToMyStoreAction }, dispatch)
)(UploadForm);
