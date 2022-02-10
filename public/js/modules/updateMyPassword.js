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
  const saveBtn = updateMyPassEl.saveBtn;
  return async event => {
    event.preventDefault();

    // Set btn value
    saveBtn.textContent = 'Updating Password...';

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

      // Set password fields to null
      updateMyPassEl.password.value = '';
      updateMyPassEl.currentPassword.value = '';
      updateMyPassEl.passwordConfirm.value = '';

      // Show password values
      saveBtn.textContent = 'Save Password';
    } catch (error) {
      //  Handle errors
      showAlert(error.message, 'error');
      saveBtn.textContent = 'Save Password';
    }
  };
};

export default updateMyPassword;
