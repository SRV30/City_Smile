import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { STATUS_CODES } from "../constants/index.js";
import {
  clearAuthCookies,
  setAuthCookies,
  COOKIE_NAMES,
} from "../utils/cookies.js";
import {
  loginSchema,
  refreshTokenSchema,
  changePasswordSchema,
} from "../validators/auth.validator.js";
import authService from "../services/auth.service.js";

const sendAuthSuccess = (res, statusCode, message, admin) => {
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, { admin }, message));
};

const getCookieOrBodyRefreshToken = (req) => {
  const cookieToken = req.cookies?.[COOKIE_NAMES.REFRESH_TOKEN];
  const bodyToken = req.body?.refreshToken;

  return cookieToken || bodyToken || null;
};

export const login = asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Validation failed",
      parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
    );
  }

  const { admin, accessToken, refreshToken } = await authService.loginAdmin(
    parsed.data
  );

  setAuthCookies(res, { accessToken, refreshToken });

  return sendAuthSuccess(res, STATUS_CODES.OK, "Login successful", admin);
});

export const logout = asyncHandler(async (_req, res) => {
  clearAuthCookies(res);
  await authService.logoutAdmin();

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, null, "Logout successful"));
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = getCookieOrBodyRefreshToken(req);

  const parsed = refreshTokenSchema.safeParse({
    refreshToken,
  });

  if (!parsed.success) {
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Validation failed",
      parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
    );
  }

  const {
    admin,
    accessToken,
    refreshToken: newRefreshToken,
  } = await authService.refreshAuthSession({
    refreshToken: parsed.data.refreshToken,
  });

  setAuthCookies(res, {
    accessToken,
    refreshToken: newRefreshToken,
  });

  return sendAuthSuccess(
    res,
    STATUS_CODES.OK,
    "Session refreshed successfully",
    admin
  );
});

export const me = asyncHandler(async (req, res) => {
  if (!req.admin?._id) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Authentication required.");
  }

  const { admin } = await authService.getCurrentAdmin({
    adminId: req.admin._id,
  });

  return sendAuthSuccess(
    res,
    STATUS_CODES.OK,
    "Current admin fetched successfully",
    admin
  );
});

export const changePassword = asyncHandler(async (req, res) => {
  const parsed = changePasswordSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Validation failed",
      parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
    );
  }

  const { admin, accessToken, refreshToken } =
    await authService.changeAdminPassword({
      adminId: req.admin?._id,
      currentPassword: parsed.data.currentPassword,
      newPassword: parsed.data.newPassword,
    });

  setAuthCookies(res, { accessToken, refreshToken });

  return sendAuthSuccess(
    res,
    STATUS_CODES.OK,
    "Password changed successfully",
    admin
  );
});

export default {
  login,
  logout,
  refresh,
  me,
  changePassword,
};
