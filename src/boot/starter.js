import React from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

import store from './store';
import RootStack from './navigation';

export default () => (
  <Provider store={store}>
    <Root>
      <RootStack />
    </Root>
  </Provider>
);
