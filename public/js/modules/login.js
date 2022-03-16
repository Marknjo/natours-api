/**
 * Handles user login
 * @todo Add CSRF protection
 *
 * @param {String} formEl form DOM element
 */
const handleLogin = async function (formEl) {
  try {
    // Handle form submit
    // Form inputs
    const formData = new FormData(formEl);
    const email = formData.get('email');
    const password = formData.get('password');

    // Check if they are available before submiting
    if (!email || !password) throw new Error('Email or Password missing');

    // Submit data for processing
    const submitUrl = '/api/v1/users/login';
    const submitData = {
      email,
      password,
    };

    const response = await fetch(submitUrl, {
      method: 'POST',
      body: JSON.stringify(submitData),
      credentials: 'same-origin',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    const res = await response.json();

    /// Check for response errors
    if (res.status !== 'success') {
      throw new Error(res.message);
    }

    /// Successful login
    // TODO Add successful message
    console.log('Login was successful');

    // Redirect to /sys-admin
    // TODO: Redirect /sys-admin
    location.replace('/');
  } catch (error) {
    /// Catch errors heres
    // TODO Implement messaging
    console.log(error.name);
    console.error(error);
  }
};

export default handleLogin;
