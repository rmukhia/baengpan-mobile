/* All account related actions */
import axios from 'axios';
import { API } from '../constants/rest-gateway';
import { errorAction } from './applicaiton-state-actions';

/* Returns Promise with 'account' on success or 'error' on  error. */
export const loginAction = (email, password, pin) => dispatch => axios.post(API.loginApi(), {
  params: {
    email,
    password,
    pin
  }
}).then((response) => {
  if ('error' in response) {
    switch (response.error) {
      case 'invalid_credentials':
        throw new Error('Credentials are not valid.');
      default:
        throw new Error(response.error);
    }
  }

  const account = {
    username: email,
    pin,
    ...response
  };
  dispatch({
    type: 'login-action',
    payload: account,
  });

  return Promise.resolve(account);
}).catch((error) => {
  dispatch(errorAction(error.message));
  return Promise.reject(error);
});

export const logoutAction = () => (dispatch) => {

};
