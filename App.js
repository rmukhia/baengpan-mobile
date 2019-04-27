import React from 'react';
import Starter from './src/boot/starter';

// eslint-disable-next-line no-undef
if (__DEV__) {
  // eslint-disable-next-line no-console
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

export default () => (<Starter />);
