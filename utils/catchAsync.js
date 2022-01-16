/**
 * Express Asyncronous Wrapper
 * Centralizes Asyncrounous Errors by Delegating Error handling to the global error handler
 * @param {Function} fn Asyncrounous Express handler
 * @returns {Function} Express handler
 */
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
