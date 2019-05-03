import store from '../boot/store';

export const getUserToken = () => store.getState().account.userToken;

export const getUserLoggedIn = () => store.getState().application.loggedIn;
