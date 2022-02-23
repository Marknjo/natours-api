/**
 * Implements advanced find features
 *
 *  - Basic Filtering,
 *  - Advanced filtering,
 *  - Feild selecting,
 *  - sorting fields,
 *  - and paginating requests
 */

class FindFeatures {
  /**
   *
   * @param {Instance} query Calling object;
   * @param {Object} queryStr Request query object
   */
  constructor(query, queryStr = {}) {
    this.queryStr = queryStr;
    this.query = query;
  }

  // HELPER METHODS
  _formatQueryFields(str) {
    return str.split(',').join(' ');
  }

  // FEATURES
  // FILTERING
  filterQuery() {
    let queryStr = { ...this.queryStr };

    // Filter filds that are not in the table [sort, fields, page, limit]
    const filterFields = ['sort', 'fields', 'page', 'limit'];
    filterFields.forEach(el => delete queryStr[el]);

    //Advanced filtering
    queryStr = JSON.parse(
      JSON.stringify(queryStr).replace(
        /\b(gt|gte|lt|lte)\b/g,
        match => `$${match}`
      )
    );

    // Create query;
    this.query = this.query.find(queryStr);

    return this;
  }

  // FIELDS
  limitFields() {
    const requestedFields = this.queryStr.fields;
    if (requestedFields) {
      const formatedFields = this._formatQueryFields(requestedFields);
      //return query
      this.query = this.query.select(formatedFields);
    } else {
      // do not show __v field
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // SORTING
  sortBy() {
    const sortByRequest = this.queryStr.sort;
    if (sortByRequest) {
      const formatedSortingFields = this._formatQueryFields(sortByRequest);
      //return query
      this.query = this.query.sort(formatedSortingFields);
    } else {
      // do not show __v field
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // PAGINATION
  paginate() {
    // page, limit, skip
    const { page, limit } = this.queryStr;

    // Requested page
    const reqPage = +page || 1;

    // Requested Limit
    const reqLimit = +limit || 100;

    // Pages to skip
    const skipPages = (reqPage - 1) * reqLimit;

    // Construct query
    this.query = this.query.skip(skipPages).limit(reqLimit);

    // return query
    return this;
  }
}

export default FindFeatures;
