/**
 * 1500 delayed redirect to a given page.
 * Allows to show a popup message before redict
 * @param {String} url URL of the location to direct to, starting with /
 */
export const delayedRedirectTo = function (url) {
  setTimeout(() => {
    location.assign(url);
  }, 1500);
};

/**
 * 1500 delayed page refresh.
 * Allows to show a popup message before redict
 * @param {String} url URL of the location to direct to, starting with /
 */
export const delayedPageRefresh = function () {
  setTimeout(() => {
    location.reload(true);
  }, 500);
};

export const pageRefresh = function () {
  location.reload(true);
};
