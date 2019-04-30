import React from 'react';
import {
  Content, Header, Left, Right, Body, Text, Button, Icon,
} from 'native-base';
import globalStyle from '../../../constants/global-styles';

import i18n from '../../../utils/i18n';
import WrapperContainer from '../../../component/wrapper-container-component';

export default props => (
  <WrapperContainer>
    <Content>
      <Button
        iconLeft
        transparent
        onPress={() => { props.navigation.navigate('UploadScreen'); }}
      >
        <Icon name="add" />
        <Text>{i18n.t('add')}</Text>
      </Button>
    </Content>
  </WrapperContainer>
);
