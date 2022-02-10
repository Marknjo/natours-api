import showAlert from './alertMessages.js';
import handlerApiRequests from './handleApiRequests.js';
//import { delayedPageRefresh, delayedRedirectTo } from './helpers.js';

/**
 * Handles update current logged in user password
 * - Borrows implementation from login function
 * @param {String} updateMyPassEl DOM element
 * @returns {Void}
 */
const updateMyPassword = updateMyPassEl => {
  return async event => {
    event.preventDefault();

    //const form
    const form = new FormData(updateMyPassEl);
    const password = form.get('password');
    const currentPassword = form.get('currentPassword');
    const passwordConfirm = form.get('passwordConfirm');

    try {
      // do client side validations
      if (!password || !passwordConfirm || !currentPassword) {
        throw new Error(
          'One of the password field is empty. Please fill in all fields'
        );
      }
    } catch (err) {
      showAlert('error', err.message);
    }

    // create data
    const data = {
      password,
      passwordConfirm,
      currentPassword,
    };

    // form data
    const url = '/api/v1/users/update-my-password';

    try {
      // Will handle success messages
      const resp = await handlerApiRequests({ url, method: 'PATCH' }, data);

      if (!resp) throw new Error('Something happened to the response');

      // handle success message
      showAlert('You have updated your password successfully.', 'success');
    } catch (error) {
      //  Handle errors
      showAlert(error.message, 'error');
    }
  };
};

export default updateMyPassword;
