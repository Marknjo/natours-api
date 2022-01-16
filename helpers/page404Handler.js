import AppError from '../utils/appError.js';

const page404Handlers = (req, res, next) => {
  const message = `404: Page ${req.originalUrl} is not found in this site.`;

  next(new AppError(message, 404));
};

export default page404Handlers;
