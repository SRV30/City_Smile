import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/index.js";

const errorMiddleware = (err, _req, res, _next) => {
  const statusCode =
    err instanceof ApiError
      ? err.statusCode
      : err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;

  const message =
    err instanceof ApiError
      ? err.message
      : err.message || "Internal Server Error";

  const errors = err instanceof ApiError ? err.errors || [] : [];

  console.error("ERROR:", err);

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorMiddleware;
