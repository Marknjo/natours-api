import showAlert from './alertMessages.js';
import handlerApiRequests from './handleApiRequests.js';
//import { delayedPageRefresh, delayedRedirectTo } from './helpers.js';

/**
 * Handles update current logged in user data
 * @returns {Void}
 */
const updateMe = async function (event) {
  event.preventDefault();

  //const form

  const formData = new FormData(this);
  const email = formData.get('email');
  const name = formData.get('name');
  // const photo = formData.get('photo'); @TODO: implement client side validations

  try {
    // do client side validations
    if (!email || !name) {
      throw new Error('Email or name not submitted');
    }
  } catch (err) {
    showAlert('error', err.message);
  }

  // Form Url
  const url = '/api/v1/users/update-me';

  try {
    // Will handle success messages
    const resp = await handlerApiRequests(
      { url, method: 'PATCH', isFileUpload: true },
      formData
    );

    // Reset fields if successful
    this.email.value = email;
    this.name.value = name;

    if (!resp) throw new Error(resp);

    // handle success message
    showAlert('You have updated your information successfully.', 'success');
  } catch (error) {
    //  Handle errors
    showAlert(error.message, 'error');
  }
};

export default updateMe;
