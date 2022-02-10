import showAlert from './alertMessages.js';
import handlerApiRequests from './handleApiRequests.js';

const logout = async el => {
  try {
    const url = '/api/v1/users/logout';
    const resp = await handlerApiRequests({ method: 'GET', url });

    if (resp) {
      showAlert('You were successfully logged out', 'success');
      setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

export default logout;
