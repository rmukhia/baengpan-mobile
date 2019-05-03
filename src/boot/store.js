import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers/root-reducer';

// eslint-disable-next-line import/no-mutable-exports
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

export default store;
