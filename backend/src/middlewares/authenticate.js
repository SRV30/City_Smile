import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Admin from "../models/admin.model.js";
import { STATUS_CODES } from "../constants/index.js";
import { COOKIE_NAMES } from "../utils/cookies.js";
import { verifyAccessToken } from "../utils/jwt.js";

const authenticate = asyncHandler(async (req, _res, next) => {
  let token = null;

  // Prefer cookie-based auth
  if (req.cookies && req.cookies[COOKIE_NAMES.ACCESS_TOKEN]) {
    token = req.cookies[COOKIE_NAMES.ACCESS_TOKEN];
  }

  // Optional fallback for API clients / testing
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      "Authentication required. Please login first."
    );
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (error) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      "Invalid or expired authentication token."
    );
  }

  if (!decoded?.id) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      "Invalid authentication token."
    );
  }

  const admin = await Admin.findById(decoded.id).select(
    "+password +tokenVersion +failedLoginAttempts +lockUntil"
  );

  if (!admin) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      "Authenticated admin not found."
    );
  }

  if (!admin.isActive) {
    throw new ApiError(
      STATUS_CODES.FORBIDDEN,
      "Your account has been deactivated."
    );
  }

  if (admin.lockUntil && admin.lockUntil > Date.now()) {
    throw new ApiError(
      STATUS_CODES.FORBIDDEN,
      "Your account is temporarily locked. Please try again later."
    );
  }

  if (
    typeof decoded.tokenVersion === "number" &&
    admin.tokenVersion !== decoded.tokenVersion
  ) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      "Session is no longer valid. Please login again."
    );
  }

  req.admin = admin;
  next();
});

export default authenticate;
