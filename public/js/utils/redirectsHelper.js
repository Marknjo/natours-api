//

/**
 *  Manages redirects -> Assign, reloadpage, delayedRedicts, redirect without going back
 * @param {string} url
 * @param {{ allowDelay: boolean, delayPeriod: number, redirectOption: 'pageRefresh' | 'allowsGoBack' | 'disallowGoBack' }} configOptions A list of configaration options
 * @returns {Location} action to redict
 */
const redirectTo = function (
  url,
  configOptions = {
    directOption: '',
    allowDelay: false,
    delayPeriod: 10,
  }
) {
  // Initialize configurations
  const { allowDelay, delayPeriod, redirectOption } = configOptions
    ? {
        redirectOption: 'allowsGoBack',
        delayPeriod: 10,
        ...configOptions,
      }
    : {
        allowDelay: false,
        delayPeriod: 10,
        redirectOption: 'allowsGoBack',
      };

  /// Handle delay cases
  if (allowDelay) {
    setTimeout(() => {
      setRedirectOption(url, redirectOption);
    }, delayPeriod * 1000);
  }

  // No redirection -> select type of redirection
  setRedirectOption(url, redirectOption);
};

/**
 *  Factory to Selects the ridirect option
 * @param {string} url Where to go
 * @param {'pageRefresh' | 'allowsGoBack' | 'disallowGoBack'} options Selects location reload, replace or assign methods
 * @returns {Location}
 */
const setRedirectOption = function (url, options = '') {
  let redirectOption;

  switch (options) {
    case 'pageRefresh':
      redirectOption = location.reload(url);
      break;

    case 'allowsGoBack':
      redirectOption = location.assign(url);
      break;

    case 'disallowGoBack':
      redirectOption = location.replace(url);
      break;
  }

  return redirectOption;
};

/// Export redirect
export default redirectTo;
