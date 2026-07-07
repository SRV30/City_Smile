import Admin from "../models/Admin.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateToken } from "../utils/jwt.js";
import { cookieOptions } from "../utils/cookie.js";

/**
 * POST /api/v1/auth/login
 */
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const admin = await Admin.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password");

  if (!admin) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!admin.isActive) {
    throw new ApiError(403, "Account is disabled");
  }

  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  const token = generateToken(admin._id);

  const safeAdmin = await Admin.findById(admin._id).select("-password");

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          admin: safeAdmin,
        },
        "Logged in successfully"
      )
    );
});

/**
 * POST /api/v1/auth/logout
 */
export const logoutAdmin = asyncHandler(async (_req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

/**
 * GET /api/v1/auth/me
 */
export const getCurrentAdmin = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.admin, "Current admin fetched successfully")
    );
});

/**
 * PUT /api/v1/auth/change-password
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body || {};

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, "All password fields are required");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "New password and confirm password do not match");
  }

  const admin = await Admin.findById(req.admin._id).select("+password");

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const isCurrentPasswordValid = await admin.comparePassword(currentPassword);

  if (!isCurrentPasswordValid) {
    throw new ApiError(401, "Current password is incorrect");
  }

  admin.password = newPassword;
  await admin.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});
