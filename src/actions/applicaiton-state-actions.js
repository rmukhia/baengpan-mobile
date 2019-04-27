/* Application states */

// Shows loading screen, state is true or false
export const loadingAction = state => ({
  type: 'loading-action',
  payload: state,
});

export const currentScreenAction = currentNavigation => ({
  type: 'current-screen-action',
  payload: currentNavigation,
});

export const errorAction = errorString => ({
  type: 'error-action',
  payload: errorString,
});
