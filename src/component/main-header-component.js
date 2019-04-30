import React from 'react';
import {
  Header, Title, Button, Left, Right, Body, Icon
} from 'native-base';
import i18n from '../utils/i18n';

export default () => (
  <Header>
    <Left />
    <Body>
      <Title>{i18n.t('title')}</Title>
    </Body>
    <Right>
      <Button transparent>
        <Icon name="notifications" />
      </Button>
    </Right>

  </Header>
);
