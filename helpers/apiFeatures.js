// Implement API filtering feature
class APIFeature {
  // get default values, mongoose model instance and query string
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Helpers
  /**
   * Replace comma with empty spaces
   * @param {String} str Query string query Separated
   * @returns {String} Cleaned String spaced with empty spaces insteat of commma
   */
  _replaceCommaWithSpace(str) {
    return str.split(',').join(' ');
  }

  // FEATURES

  /**
   * Implent query filters
   * @returns {Instance} This class
   */
  filter() {
    // 1). Filtering
    const queryObj = { ...this.queryString };
    // Filtering Basic fields,sort,page,limit
    const excludeQueryFields = ['fields', 'sort', 'page', 'limit'];
    excludeQueryFields.map(field => delete queryObj[field]);

    // Filtering Adavanced
    const queryStr = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gte|gt|lte|lt)\b/,
        match => `$${match}`
      )
    );

    this.query = this.query.find(queryStr);

    return this;
  }

  /**
   * Implement query fields a query will return
   * @returns {Instance} This Api instance
   */
  limitFields() {
    const showFields = this.queryString.fields;
    if (showFields) {
      const cleanFields = this._replaceCommaWithSpace(showFields);
      this.query = this.query.select(cleanFields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  /**
   * Implement query fields sorting
   * @returns {Instance} This Api instance
   */
  sort() {
    // 3). Sorting
    const sortFields = this.queryString.sort;
    if (sortFields) {
      const cleanSortFields = this._replaceCommaWithSpace(sortFields);
      this.query = this.query.sort(cleanSortFields);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  /**
   * Implements Query Pagination
   * @returns {Instance} This Api instance
   */
  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeature;
