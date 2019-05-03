/*
 * This reducer handles the currently logged in user's state.
*/

const router = {
  'set-account-property-action': (state, action) => Object.assign({}, state, action.payload),
  'set-logged-in-action': (state, action) => Object.assign({}, state, action.payload),
};

const defaultState = {
  email: null,
  userToken: null,
};

export default (state = defaultState, action) => {
  if (router[action.type]) return router[action.type](state, action);
  return state;
};
