/**
 * Filters unwanted fields given array of strings and an object of data value pair
 * @param {string[]} fields Array of fields to filter
 * @param {{any}} dataObj Object to filter its keys
 * @returns {{any}} Filtered fields, key:value object
 */
export const filterRequiredFields = (fields, dataObj) => {
  const dataFields = new Map(Object.entries(dataObj));

  return fields.reduce((curr, field) => {
    if (dataFields.has(field)) curr[field] = dataObj[field];
    return curr;
  }, {});
};
