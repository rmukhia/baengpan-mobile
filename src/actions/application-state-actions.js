/* Application states */

export const setApplicationPropertyAction = propertyObject => ({
  type: 'set-application-property-action',
  payload: propertyObject,
});

/* Only common actions are defined here, rare actions can be set
 * using setApplicationPropertyAction
 */

// Shows loading screen, state is true or false
export const loadingAction = state => ({
  type: 'loading-action',
  payload: state,
});

export const currentScreenAction = currentNavigation => ({
  type: 'current-screen-action',
  payload: currentNavigation,
});

// Show error toast
export const errorAction = errorString => ({
  type: 'error-action',
  payload: errorString,
});
