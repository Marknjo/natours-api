import displayMapbox from './modules/mapbox.js';

// Elements
const mapEl = document.getElementById('map');
const loginFormEl = document.getElementById('login-form');

// Handle Mapbox Display
if (mapEl) {
  const locations = JSON.parse(mapEl.dataset.locations);

  displayMapbox(locations);
}

// Handle user login
if (loginFormEl) {
  // Promise timeout
  const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  /**
   * Send A GET or POST Request request to server
   * @param {Object{url: String, method: String}} options URL and Request type to post the data
   * @param {Object} data Requires to have submit data to the server
   * @return {Void}
   */
  const submitData = async function (options, uploadData) {
    try {
      const fetchType = uploadData
        ? fetch(options.url, {
            method: options.method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
          })
        : fetch(options.url);

      const response = await Promise.race([timeout(5000), fetchType]);

      //convert to JSON -> Get data
      const data = await response.json();

      // Handle success message
      if (data.status === 'fail' || data.status !== 'success')
        throw new Error(data.message);

      // Redirect to dashboard

      console.log('successful login');
    } catch (error) {
      // @TODO: Handle messaging appropriately
      // Display Error message
      console.error(error);
    }
  };

  loginFormEl.addEventListener('submit', event => {
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
    submitData({ url, method: 'POST' }, data);
  });
}
