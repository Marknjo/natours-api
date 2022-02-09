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
