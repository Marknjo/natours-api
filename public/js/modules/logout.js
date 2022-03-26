import { asyncImportWrapper } from '../utils/handleErrors.js';
import httpRequestHelper from '../utils/httpRequestsHelper.js';
import redirectTo from '../utils/redirectsHelper.js';

/**
 * Logout user feature
 */
const handleLogout = asyncImportWrapper(
  async function () {
    // Send request to the server to logout user
    const url = '/api/v1/users/logout';

    const response = await httpRequestHelper(url, {
      requestMethod: 'GET',
    });

    // Check for errors
    if (response.status === 'failed' || response.status === 'error') {
      throw new Error('Could not log out user');
    }

    // TODO: Handle successful messaging
    console.log(response.data.message);

    /// Handle redirects
    const logoutFromUrl = location.pathname;

    /// Redirect to
    // Loggin out from admin dashboard
    if (logoutFromUrl.includes('sys-admin')) {
      redirectTo('/', {
        redirectOption: 'disallowGoBack',
      });
    }

    // Loggin out from other client pages
    redirectTo(logoutFromUrl, {
      redirectOption: 'pageRefresh',
    });
  },
  { message: 'Logout failed 😢😢😢. It seems there is an error login out.' }
);

/// Export Log out feature
export default handleLogout;
