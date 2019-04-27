import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ApplicationState from './application-state-reducer';

export default combineReducers({
  form: formReducer,
  ApplicationState,
});
