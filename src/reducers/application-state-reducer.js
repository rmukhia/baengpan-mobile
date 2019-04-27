/*
 * This reducer handles the GUI and application state.
 * For example:
 *  When the user clicks an item in market, it will go to market detail's screen
 *  the item which users click will be stored in this state.
 */

const router = {
  // current item for marketplace
  'MARKET-CURRENT-ITEM': (state, action) => Object.assign({}, state, {
    marketCurrentItem: action.payload
  }),

  // Loading screen
  'loading-action': (state, action) => Object.assign({}, state, {
    loadingState: action.payload,
  }),

  // Error screen
  'error-action': (state, action) => Object.assign({}, state, {
    errorString: action.payload,
  }),
};


const defaultState = {
  loadingState: false,
  errorString: '',
};

export default (state = defaultState, action) => {
  if (router[action.type]) return router[action.type](state, action);
  return state;
};
