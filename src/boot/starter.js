import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Root } from 'native-base';

import reducer from '../reducers/root-reducer';
import RootStack from './navigation';

let store;

// If dev, enable reactotron debugger
// https://github.com/infinitered/reactotron
// eslint-disable-next-line no-undef
if (__DEV__) {
  // eslint-disable-next-line global-require
  const Reactotron = require('../../ReactotronConfig').default;
  store = createStore(reducer,
    compose(
      applyMiddleware(thunk),
      Reactotron.createEnhancer()
    ));
} else {
  store = createStore(reducer, applyMiddleware(thunk));
}

export default () => (
  <Provider store={store}>
    <Root>
      <RootStack />
    </Root>
  </Provider>
);
