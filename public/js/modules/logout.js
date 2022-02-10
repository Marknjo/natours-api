import showAlert from './alertMessages.js';
import handlerApiRequests from './handleApiRequests.js';
import { delayedPageRefresh, redirectTo } from './helpers.js';

const logout = async () => {
  try {
    const url = '/api/v1/users/logout';
    const resp = await handlerApiRequests({ method: 'GET', url });

    if (!resp)
      throw new Error(
        'Something happened while logging out. Please try again.'
      );

    // Handle redirect or page refresh

    // Locations check list (dashboard related)
    const locationsCheck = ['/dashboard', '/bookings'];

    // Redirect if location is in the list
    locationsCheck.forEach(el => {
      if (!location.pathname.startsWith(el)) return;
      redirectTo('/');
    });

    // Refresh the page if location is in the list
    showAlert('You were successfully logged out', 'success');
    delayedPageRefresh(500);
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

export default logout;
