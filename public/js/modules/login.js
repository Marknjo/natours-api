import { asyncErrorWrapper } from '../utils/handleErrors.js';
import httpRequestHelper, {
  handleHttpErrors,
} from '../utils/httpRequestsHelper.js';
import redirectTo from '../utils/redirectsHelper.js';

/**
 * Handles user login
 * @todo Add CSRF protection
 *
 * @param {String} formEl form DOM element
 */
const handleLogin = async function (formEl) {
  return asyncErrorWrapper(
    async () => {
      // Handle form submit
      // Form inputs
      const formData = new FormData(formEl);
      const email = formData.get('email');
      const password = formData.get('password');
      const remember = formData.get('remember');

      // Check if they are available before submiting
      if (!email || !password) throw new Error('Email or Password missing');

      // Submit data for processing
      const submitUrl = '/api/v1/users/login';
      const submitData = {
        email,
        password,
        remember,
      };

      const response = await httpRequestHelper(submitUrl, {
        submitData,
        dataType: 'normal',
        requestMethod: 'POST',
        sendPlainResponse: true,
      });

      /// Handle errors from the server
      await handleHttpErrors(response, 'Login failed 😢😢😢');

      /// Successful login -> Message handled by the server to survive redirect
      redirectTo('/sys-admin', {
        redirectOption: 'disallowGoBack',
        allowDelay: true,
      });
    },
    {},
    {
      displayPosition: 'center',
      action: 'Login Error',
    }
  );
};

export default handleLogin;
