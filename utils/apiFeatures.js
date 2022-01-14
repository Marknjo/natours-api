class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // HELPERS
  /**
   * @private Find and replace url with comma separed string with space before sending it to a query
   * @param {String} str
   * @returns String
   */
  _findAndReplaceCommaWithSpaces(str) {
    return str.split(',').join(' ');
  }
  // METHODS

  /**
   * Simple and advanced filtering
   * @returns Instance
   */

  filter() {
    // 1). Filtering
    // 1a). Simple Filtering
    const queryObj = { ...this.queryStr };
    // Exclude files ['fields', 'sort', 'page', 'limit']
    const excludedFields = ['fields', 'sort', 'page', 'limit'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1b). Advanced Filtering:
    const queryObjStr = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gt|gte|lt|lte)\b/,
        match => `$${match}`
      )
    );

    this.query = this.query.find(queryObjStr);

    return this;
  }

  /**
   * Limit the number of fields a query returns
   * @returns Instance
   */
  fieldsLimit() {
    // 2). Fields
    const fields = this.queryStr.fields;
    if (fields) {
      // Replace comma with spaces
      const fieldsStr = this._findAndReplaceCommaWithSpaces(fields);
      this.query = this.query.select(fieldsStr);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  /**
   * Sorts fields depending with the parameters provided
   * @returns Instance
   */
  sort() {
    // 3). Sorting
    const sortQuery = this.queryStr.sort;
    if (sortQuery) {
      // Replace comma with spaces
      const sortStr = this._findAndReplaceCommaWithSpaces(sortQuery);
      this.query = this.query.sort(sortStr);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  /**
   * Paginates the query the user requires
   * Also limits the number of fields query returns
   * @returns Instance
   */
  paginate() {
    const page = +this.queryStr.page || 1;
    const limit = +this.queryStr.limit || 100;
    const skip = (page - 1) * limit;

    // query pagination
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
