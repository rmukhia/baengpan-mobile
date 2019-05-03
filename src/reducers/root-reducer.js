import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ApplicationState from './application-state-reducer';
import AccountState from './account-reducer';
import MyStoreState from './my-store-reducer';

export default combineReducers({
  form: formReducer,
  application: ApplicationState,
  account: AccountState,
  myStore: MyStoreState,
});
