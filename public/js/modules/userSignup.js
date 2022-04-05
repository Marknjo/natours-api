// Imports
import { asyncErrorWrapper } from '../utils/handleErrors';
import httpRequestsHelper, {
  handleHttpErrors,
} from '../utils/httpRequestsHelper';
import redirectTo from '../utils/redirectsHelper';

/**
 * Handles user signup
 * @param {HTMLFormElement} formEl Handle to the signup form
 * @returns {Promise<void>} Returns nothing
 */
const userSignup = function (formEl) {
  // Error Error wrapper
  return asyncErrorWrapper(
    async () => {
      /// Get form data
      const formData = new FormData(formEl);

      // Prep Fields to submit
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const password = formData.get('password').trim();
      const passwordConfirm = formData.get('passwordConfirm').trim();
      const remember = formData.get('remember');

      /// Do basic validations
      // Required Validations
      if (!name || !email || !password || !passwordConfirm)
        throw new Error(
          'Required fields empty, please ensure your name, email, password, and password fields are not empty!'
        );

      // Password match
      if (password !== passwordConfirm)
        throw new Error(
          'Password do match, please ensure password and confirm password matches.'
        );

      /// Submit form
      const url = '/api/v1/users/signup';
      const submitData = {
        name,
        email,
        password,
        passwordConfirm,
        ...(remember ? { remember } : {}),
      };

      // Send Http request
      const response = await httpRequestsHelper(url, {
        submitData,
        dataType: 'normal',
        requestMethod: 'POST',
        sendPlainResponse: true,
      });

      // listen for errors
      await handleHttpErrors(response, 'Signup failed');

      // Is successful send user to the dashboard/welcome page
      redirectTo('/sys-admin', {
        redirectOption: 'disallowGoBack',
      });
    },
    {},
    {
      displayPosition: 'center',
      action: 'Signup Validation Failed!',
      messageType: 'error',
    }
  );
};

export default userSignup;
