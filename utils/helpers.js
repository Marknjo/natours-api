export const filterRequiredFields = (fields, dataObj) => {
  return fields.reduce((curr, field) => {
    if (dataObj[field]) curr[field] = dataObj[field];
    return curr;
  }, {});
};
