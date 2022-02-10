import showAlert from './alertMessages.js';
import handlerApiRequests from './handleApiRequests.js';
import { delayedPageRefresh, delayedRedirectTo } from './helpers.js';

/**
 * Handles update current logged in user data
 * - Borrows implementation from login function
 * @param {String} updateMeFormEl DOM element
 * @returns {Void}
 */
const updateMe = updateMeFormEl => {
  return async event => {
    event.preventDefault();

    //const form
    const form = new FormData(updateMeFormEl);
    const email = form.get('email');
    const name = form.get('name');
    try {
      // do client side validations
      if (!email || !name) {
        throw new Error('Email or name not submitted');
      }
    } catch (err) {
      showAlert('error', err.message);
    }

    // create data
    const data = {
      email,
      name,
    };

    // form data
    const url = '/api/v1/users/update-me';

    try {
      // Will handle success messages
      const resp = await handlerApiRequests({ url, method: 'PATCH' }, data);

      console.log(resp);

      // Reset fields if successful
      updateMeFormEl.email.value = email;
      updateMeFormEl.name.value = name;

      if (!resp) throw new Error('Something happened to the response');

      // handle success message
      showAlert('You have updated your information successfully.', 'success');
    } catch (error) {
      //  Handle errors
      showAlert(error.message, 'error');
    }
  };
};

export default updateMe;
