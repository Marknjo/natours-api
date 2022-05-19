import { errorWrapper } from './codeWrappers.js';

/**
 *
 * @param {T} objArr Array of objects which must have a field with the date field (Configurable in the dateFieldName)
 * @param {sortOrder: 'desc' | 'asc', dateFieldName: 'createdAt'} configOptions - configuration options of the following fields
 * @property {'desc' | 'asc'} sortOrder Allows only ascending or descending order
 * @property {string} dateFieldName A field in the object representing a date field = default = 'createdAt'
 * @returns
 */
const sortObjByDateField = (
  objArr,
  configOptions = { sortOrder: 'desc', dateFieldName: 'createdAt' }
) => {
  return errorWrapper(() => {
    const defaultConfigsValues = {
      sortOrder: 'desc',
      dateFieldName: 'createdAt',
    };

    /// Do not sort only one item in the Object array
    if (objArr.length === 1) return objArr;

    /// Initialize configuration
    const { sortOrder, dateFieldName } = {
      ...defaultConfigsValues,
      ...(configOptions ? configOptions : {}),
    };

    /// Validations
    // Validated sort order
    if (sortOrder !== 'asc' && sortOrder !== 'desc')
      throw new Error(
        `Invalid sortOrder option ${sortOrder}, expects asc or desc values`
      );

    /// Check if the supplied objects have a key of dateFieldNames before sorting
    if (!objArr || !Array.isArray(objArr))
      throw new Error(
        'Invalid object array format, Expects and array of objects'
      );

    const objWithErrors = objArr.filter(
      obj => !obj.hasOwnProperty([dateFieldName])
    );

    if (objWithErrors.length > 0)
      throw new Error(
        `Cannot find a DateField with a property of (${dateFieldName})`
      );

    const dateToNumber = date => {
      return new Date(date).getTime();
    };

    return objArr.sort(
      (a, b) => dateToNumber(b[dateFieldName]) - dateToNumber(a[dateFieldName])
    );
  });
};

export default sortObjByDateField;
