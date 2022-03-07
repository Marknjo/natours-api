/**
 * Filters unwanted fields given array of strings and an object of data value pair
 * @param {string[]} fields Array of fields to filter
 * @param {{any}} dataObj Object to filter its keys
 * @returns {{any}} Filtered fields, key:value object
 */
export const filterRequiredFields = (fields, dataObj) => {
  return fields.reduce((curr, field) => {
    if (dataObj[field]) curr[field] = dataObj[field];
    return curr;
  }, {});
};
