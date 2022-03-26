import { asyncErrorWrapper } from '../utils/handleErrors.js';
import httpRequestHelper, {
  handleHttpErrors,
} from '../utils/httpRequestsHelper.js';
import redirectTo from '../utils/redirectsHelper.js';

/**
 * Logout user feature
 */
const handleLogout = async function () {
  return asyncErrorWrapper(async () => {
    // Send request to the server to logout user
    const url = '/api/v1/users/logout';

    /// Set origin url for tracking showOnPage
    document.cookie = `originPageUrl=${
      location.pathname
    }; SameSite=Strict; expires:${new Date(Date.now() + 2 * 1000)} Secure`;

    const response = await httpRequestHelper(url, {
      requestMethod: 'GET',
      sendPlainResponse: true,
    });

    if (!response.ok)
      throw new Error('Server error, could not logout successfully.');

    // Check for errors
    await handleHttpErrors(
      response,
      'Logout failed 😢😢😢. It seems there is an error login out.'
    );

    // Successful logout -> Server will respond with the message

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
  });
};

/// Export Log out feature
export default handleLogout;
