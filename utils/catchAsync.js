/**
 * Converts Express route handler to use async await paradigm
 * @param {Function} fn Function handler
 * @returns
 */
const cathcAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default cathcAsync;
