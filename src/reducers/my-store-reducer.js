/*
 * This reducer handles the current user's Store items
*/

const router = {
  'set-my-store-items-action': (state, action) => Object.assign({}, state, { items: action.payload }),
};

const defaultState = {
  items: [],
};

export default (state = defaultState, action) => {
  if (router[action.type]) return router[action.type](state, action);
  return state;
};