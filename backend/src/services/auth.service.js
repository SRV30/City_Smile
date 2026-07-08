import ApiError from "../utils/ApiError.js";
import Admin from "../models/admin.model.js";
import { STATUS_CODES } from "../constants/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const LOCK_AFTER_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

const getSafeAdmin = (admin) => {
  if (!admin) return null;

  if (typeof admin.toSafeJSON === "function") {
    return admin.toSafeJSON();
  }

  return {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    avatar: admin.avatar,
    role: admin.role,
    isActive: admin.isActive,
    lastLogin: admin.lastLogin,
    tokenVersion: admin.tokenVersion,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
};

const getAuthTokens = (admin) => {
  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  return {
    accessToken,
    refreshToken,
  };
};

const throwInvalidCredentials = () => {
  throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Invalid email or password.");
};

const handleFailedLogin = async (admin) => {
  admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1;

  if (admin.failedLoginAttempts >= LOCK_AFTER_FAILED_ATTEMPTS) {
    admin.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);
    admin.failedLoginAttempts = 0;
  }

  await admin.save({ validateBeforeSave: false });
};

const resetLoginState = async (admin) => {
  admin.failedLoginAttempts = 0;
  admin.lockUntil = null;
  admin.lastLogin = new Date();

  await admin.save({ validateBeforeSave: false });
};

export const loginAdmin = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Email and password are required."
    );
  }

  const admin = await Admin.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password +tokenVersion +failedLoginAttempts +lockUntil");

  if (!admin) {
    throwInvalidCredentials();
  }

  if (!admin.isActive) {
    throw new ApiError(STATUS_CODES.FORBIDDEN, "Your account is deactivated.");
  }

  if (admin.lockUntil && admin.lockUntil > Date.now()) {
    throw new ApiError(
      STATUS_CODES.FORBIDDEN,
      "Account is temporarily locked due to multiple failed login attempts."
    );
  }

  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    await handleFailedLogin(admin);
    throwInvalidCredentials();
  }

  await resetLoginState(admin);

  const { accessToken, refreshToken } = getAuthTokens(admin);

  return {
    admin: getSafeAdmin(admin),
    accessToken,
    refreshToken,
  };
};

export const refreshAuthSession = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Refresh token is required.");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      "Invalid or expired refresh token."
    );
  }

  if (!decoded?.id) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Invalid refresh token.");
  }

  const admin = await Admin.findById(decoded.id).select(
    "+tokenVersion +failedLoginAttempts +lockUntil"
  );

  if (!admin) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Admin session not found.");
  }

  if (!admin.isActive) {
    throw new ApiError(STATUS_CODES.FORBIDDEN, "Your account is deactivated.");
  }

  if (admin.lockUntil && admin.lockUntil > Date.now()) {
    throw new ApiError(
      STATUS_CODES.FORBIDDEN,
      "Account is temporarily locked."
    );
  }

  if (
    typeof decoded.tokenVersion === "number" &&
    admin.tokenVersion !== decoded.tokenVersion
  ) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      "Session has been invalidated. Please login again."
    );
  }

  const tokens = getAuthTokens(admin);

  return {
    admin: getSafeAdmin(admin),
    ...tokens,
  };
};

export const getCurrentAdmin = async ({ adminId }) => {
  if (!adminId) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Admin ID is required.");
  }

  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Admin not found.");
  }

  if (!admin.isActive) {
    throw new ApiError(STATUS_CODES.FORBIDDEN, "Your account is deactivated.");
  }

  return {
    admin: getSafeAdmin(admin),
  };
};

export const changeAdminPassword = async ({
  adminId,
  currentPassword,
  newPassword,
}) => {
  if (!adminId || !currentPassword || !newPassword) {
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Current password and new password are required."
    );
  }

  if (currentPassword === newPassword) {
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "New password must be different from current password."
    );
  }

  const admin = await Admin.findById(adminId).select(
    "+password +tokenVersion +failedLoginAttempts +lockUntil"
  );

  if (!admin) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Admin not found.");
  }

  const isCurrentPasswordValid = await admin.comparePassword(currentPassword);

  if (!isCurrentPasswordValid) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      "Current password is incorrect."
    );
  }

  admin.password = newPassword;
  admin.failedLoginAttempts = 0;
  admin.lockUntil = null;

  // tokenVersion increments automatically in pre-save hook
  await admin.save();

  const tokens = getAuthTokens(admin);

  return {
    admin: getSafeAdmin(admin),
    ...tokens,
  };
};

export const logoutAdmin = async () => {
  // Stateless JWT logout is handled by clearing cookies on the client response.
  // This function is kept for service-layer symmetry and future refresh-token storage.
  return {
    success: true,
  };
};

export default {
  loginAdmin,
  refreshAuthSession,
  getCurrentAdmin,
  changeAdminPassword,
  logoutAdmin,
};
