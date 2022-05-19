import showAlert from './alertMessages.js';
import handlerApiRequests from './handleApiRequests.js';
//import { delayedPageRefresh, delayedRedirectTo } from './helpers.js';

/**
 * Handles update current logged in user password
 * @returns {Void}
 */
const updateMyPassword = async function (event) {
  event.preventDefault();
  const saveBtn = this.saveBtn;

  // Set btn value
  saveBtn.textContent = 'Updating Password...';

  //const formData
  const formData = new FormData(this);
  const password = formData.get('password');
  const currentPassword = formData.get('currentPassword');
  const passwordConfirm = formData.get('passwordConfirm');

  try {
    // do client side validations
    if (!password || !passwordConfirm || !currentPassword)
      throw new Error(
        'One of the password field is empty. Please fill in all fields'
      );

    if (password === passwordConfirm || password === currentPassword)
      throw new Error('Please submit a unique password');

    // formData data
    const url = '/api/v1/users/update-my-password';

    // Create Data
    const uploadData = {
      password,
      passwordConfirm,
      currentPassword,
    };

    // Will handle success messages
    const resp = await handlerApiRequests(
      { url, method: 'PATCH', isFileUpload: false },
      uploadData
    );

    if (!resp) throw new Error('Something happened to the response');

    // handle success message
    showAlert('You have updated your password successfully.', 'success');

    // Set password fields to null
    this.password.value = '';
    this.currentPassword.value = '';
    this.passwordConfirm.value = '';

    // Show password values
    saveBtn.textContent = 'Save Password';
  } catch (error) {
    //  Handle errors
    showAlert(error.message, 'error');
    saveBtn.textContent = 'Save Password';
  }
};

export default updateMyPassword;
