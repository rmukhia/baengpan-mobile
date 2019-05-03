/*
 * This reducer handles the GUI and application state.
 * For example:
 *  When the user clicks an item in market, it will go to market detail's screen
 *  the item which users click will be stored in this state.
 */

const router = {
  // current item for marketplace
  'set-application-property-action': (state, action) => Object.assign({}, state, action.payload),

  // Loading screen
  'loading-action': (state, action) => Object.assign({}, state, {
    loadingState: action.payload,
  }),

  // Error screen
  'error-action': (state, action) => Object.assign({}, state, {
    errorString: action.payload,
  }),

  // Set locale (en, th), in the redux store
  'set-locale': (state, action) => Object.assign({}, state, {
    locale: action.payload,
  })
};


const defaultState = {
  loadingState: false,
  errorString: '',
  locale: null,
  loggedIn: false,
  cameraPermission: false,
  cameraRollPermission: false,
};

export default (state = defaultState, action) => {
  if (router[action.type]) return router[action.type](state, action);
  return state;
};
