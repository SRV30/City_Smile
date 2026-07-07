import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Admin from "../models/Admin.model.js";
import env from "../config/env.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(token, env.jwtSecret);

  const admin = await Admin.findById(decoded.id).select("-password");

  if (!admin) {
    throw new ApiError(401, "Invalid Token");
  }

  if (!admin.isActive) {
    throw new ApiError(403, "Account Disabled");
  }

  req.admin = admin;

  next();
});
