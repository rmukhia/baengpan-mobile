import React from 'react';
import {
  View,
} from 'react-native';
import {
  Content, Text, Button, Icon, Picker,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import i18n from '../../../utils/i18n';
import WrapperContainer from '../../../component/wrapper-container-component';
import CardItemListComponent from '../../../component/card-item-list-component';
import { getAllMyStoreItemsAction } from '../../../actions/my-store-action';


class MyStoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'all',
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.pressCardAction = this.pressCardAction.bind(this);
  }

  componentDidMount() {
    this.props.getAllMyStoreItemsAction();
  }

  onCategoryChange(value) {
    this.setState({
      selectedCategory: value,
    });
  }

  pressCardAction(item) {
    console.log(item);
  }

  render() {
    let items;
    switch (this.state.selectedCategory) {
      case 'products':
        // Filter out inactive items and services
        // eslint-disable-next-line eqeqeq
        items = this.props.items.filter(item => (item.status == 1 && item.type == 0));
        break;
      case 'services':
        // Filer out inactive items and products
        // eslint-disable-next-line eqeqeq
        items = this.props.items.filter(item => (item.status == 1 && item.type == 1));
        break;
      default:
        // Filter out inactive items
        // eslint-disable-next-line eqeqeq
        items = this.props.items.filter(item => (item.status == 1));
    }

    return (
      <WrapperContainer>
        <Content>
          <View style={{ flexDirection: 'row' }}>
            <Picker
              note
              mode="dropdown"
              selectedValue={this.state.selectedCategory}
              onValueChange={this.onCategoryChange}
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Products" value="products" />
              <Picker.Item label="Services" value="services" />
            </Picker>
            <Button
              transparent
              iconLeft
              onPress={() => { this.props.navigation.navigate('UploadScreen'); }}
            >
              <Icon name="add" />
              <Text>{i18n.t('add')}</Text>
            </Button>
          </View>

          <CardItemListComponent items={items} pressCardAction={this.pressCardAction} />

        </Content>
      </WrapperContainer>
    );
  }
}

export default connect(
  state => ({
    items: state.myStore.items,
  }),
  dispatch => bindActionCreators({
    getAllMyStoreItemsAction
  }, dispatch),
)(MyStoreScreen);
