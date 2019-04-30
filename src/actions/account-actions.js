/* All account related actions */
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import AsyncStorageKeys from '../constants/async-storage-keys';
import { API } from '../constants/rest-gateway';
import { errorAction, setApplicationPropertyAction } from './applicaiton-state-actions';


/* Set account property such as { email: 'ab@c.com', firstname: 'D'} */
export const setAccountPropertyAction = propertyObject => ({
  type: 'set-account-property-action',
  payload: propertyObject,
});

/* Returns Promise with 'account' on success or 'error' on  error. */
export const loginAction = (email, password, pin) => dispatch => axios.post(API.loginApi(), {
  email,
  password,
  pin
}).then(async (response) => {
  if ('error' in response.data) {
    switch (response.data.error) {
      case 'invalid_credentials':
        throw new Error('Credentials are not valid.');
      default:
        throw new Error(response.data.error);
    }
  }

  const account = {
    username: email,
    pin,
    ...response.data
  };

  await AsyncStorage.setItem(AsyncStorageKeys.USERTOKEN, response.data.token);
  dispatch(setAccountPropertyAction(account));
  dispatch(setApplicationPropertyAction({ loggedIn: true }));
  return Promise.resolve(account);
}).catch((error) => {
  dispatch(errorAction(error.message));
  return Promise.reject(error);
});

export const logoutAction = () => async (dispatch) => {
  AsyncStorage.removeItem(AsyncStorageKeys.USERTOKEN);
  dispatch(setAccountPropertyAction({ token: null, email: null }));
  dispatch(setApplicationPropertyAction({ loggedIn: false }));
};

/* Returns Promise with 'token' on success or 'error' on  error. */
export const registerEmailAction = email => dispatch => axios.post(API.registerEmailApi(), {
  params: {
    email,
  }
}).then((response) => {
  if (!response.data.success) throw new Error('Request not successful!');
  dispatch(setAccountPropertyAction({ email }));
  return Promise.resolve(response.data);
}).catch((error) => {
  dispatch(errorAction(error.message));
  return Promise.reject(error);
});

export const registerAction = (
  email,
  token,
  password,
  firstname,
  lastname
) => dispatch => axios.post(API.registerApi(), {
  params: {
    email,
    token,
    password,
    firstname,
    lastname,
  }
}).then((response) => {
  if (!response.data.success) throw Error('Request not successful!');
  dispatch(setAccountPropertyAction({ email }));
  return Promise.resolve(response.data);
}).catch((error) => {
  dispatch(errorAction(error.message));
  return Promise.reject(error);
});
