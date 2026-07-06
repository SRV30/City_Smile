import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Settings } from '../models/Settings.model.js';

/**
 * Get singleton clinic settings
 * GET /api/v1/settings
 */
export const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();

  if (!settings) {
    throw new ApiError(404, "Settings not found. Please seed the database.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, settings, "Settings fetched successfully"));
});

/**
 * Update clinic settings
 * PUT /api/v1/settings
 */
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.findOneAndUpdate(
    {}, // Empty filter to match the singleton
    req.body,
    { new: true, runValidators: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, settings, "Settings updated successfully"));
});
