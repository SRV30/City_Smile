import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const notFoundMiddleware = asyncHandler(async (req, res, next) => {
  throw new ApiError(404, `Route ${req.originalUrl} not found`);
});

export default notFoundMiddleware;
