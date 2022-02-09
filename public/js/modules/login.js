import showAlert from './alertMessages.js';
import handlerApiRequests from './handleApiRequests.js';
import { delayedRedirectTo } from './helpers.js';

const login = loginFormEl => {
  return async event => {
    event.preventDefault();

    //const form
    const form = new FormData(loginFormEl);
    const email = form.get('email');
    const password = form.get('password');
    try {
      // do client side validations
      if (!email || !password) {
        throw new Error('Email or password incorect');
      }
    } catch (err) {
      showAlert('error', err.message);
    }

    // create data
    const data = {
      email,
      password,
    };

    // form data
    const url = '/api/v1/users/login';

    try {
      // Will handle success messages
      const resp = await handlerApiRequests({ url, method: 'POST' }, data);

      console.log(resp);

      // Reset fields if successful
      loginFormEl.email.value = '';
      loginFormEl.password.value = '';

      if (!resp) throw new Error('Something happened to the response');

      // @TODO: handle messaging
      showAlert('Login is successul', 'success');

      // Redirect user to the dashboard
      delayedRedirectTo('/');
    } catch (error) {
      //  @TODO: Handle errors
      showAlert(error.message, 'error');
    }
  };
};

export default login;
