/// Handles import of modules

import { asyncErrorWrapper, errorWrapper } from './utils/handleErrors.js';

/**
 * Import Modules
 */
const getLoginModule = () => import('./modules/login.js');

const getLocationsMapModule = () => import('./modules/locationsMap.js');

/// Import logout on demand
const getLogoutModule = () => import('./modules/logout.js');

/// Import error modal module
const getErrorModal = () => import('./modules/errorModal.js');

/// import update user data module
const getUpdateUser = () => import('./modules/updateUser.js');

/// import update user passowrd module
const getUpdateUserPassword = () => import('./modules/updateUserPassword.js');

/// import update user passowrd module
const getUserSignup = () => import('./modules/userSignup.js');

/**
 * Handle user login login with dynamic import. Import feature on demand
 * @param {Event} event from event listener
 */
export const loginFormSubmitHandler = async function (event = Event) {
  return asyncErrorWrapper(
    async () => {
      // Prevent form submit
      event.preventDefault();

      // try getting the login form
      const { default: handleLogin } = await getLoginModule();

      // Login user
      handleLogin(event.target);
    },
    {
      message: 'Error submitting form',
    }
  );
};

/**
 * Handles Map import
 */
export const loadMapHandler = function (mapEl) {
  // Error wrapper
  return asyncErrorWrapper(
    async () => {
      const { default: showLocationMap } = await getLocationsMapModule();

      //Render Map
      showLocationMap(mapEl.dataset.locations, mapEl.dataset.mapboxKey);
    },
    { message: 'Could not load the MAP' }
  );
};

/**
 * Handles logout user
 */
export const logoutHandler = async function () {
  // Error wrapper
  return asyncErrorWrapper(
    async () => {
      const { default: handleLogout } = await getLogoutModule();
      handleLogout();
    },
    { allowErrorThrow: true }
  );
};

/**
 * Handle import of errorModal (modal & backdrop)
 */
export const showErrorModalHandler = function (errorObj) {
  return errorWrapper(
    async () => {
      const { showErrorModal, showErrorBackdrop } = await getErrorModal();

      /// show modal and backdrop
      showErrorBackdrop(errorObj);
      showErrorModal(errorObj);
    },
    { message: 'Could not load error modal' }
  );
};

/**
 * Handle update user data
 */
export const updateUserHandler = function (event) {
  return asyncErrorWrapper(
    async () => {
      event.preventDefault();

      const { default: updateUser } = await getUpdateUser();

      updateUser(this);
    },
    { allowErrorThrow: true }
  );
};

/**
 * Handle update user password
 */
export const updateUserPasswordHandler = function (event) {
  return asyncErrorWrapper(
    async () => {
      event.preventDefault();

      const { default: updateUserPassword } = await getUpdateUserPassword();

      updateUserPassword(this);
    },
    { allowErrorThrow: true }
  );
};

/**
 * Imports user signup handler
 */
export const userSignupHandler = function (event) {
  return asyncErrorWrapper(
    async () => {
      event.preventDefault();

      const { default: userSignup } = await getUserSignup();

      userSignup(this);
    },
    { allowErrorThrow: true }
  );
};
