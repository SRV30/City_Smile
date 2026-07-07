import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Settings } from '../models/Settings.model.js';
import { getSingleton } from '../utils/modelHelpers.js';
import { STATUS_CODES } from '../constants/index.js';

/**
 * Get singleton clinic settings
 * GET /api/v1/settings
 */
export const getSettings = asyncHandler(async (_req, res) => {
  const settings = await getSingleton(Settings);

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, settings, "Settings fetched successfully"));
});

/**
 * Update clinic settings
 * PUT /api/v1/settings
 */
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getSingleton(Settings, req.body);

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, settings, "Settings updated successfully"));
});
