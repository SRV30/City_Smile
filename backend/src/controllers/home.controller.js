import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Home } from '../models/Home.model.js';
import { getSingleton } from '../utils/modelHelpers.js';
import { STATUS_CODES } from '../constants/index.js';

export const getHome = asyncHandler(async (_req, res) => {
  const home = await getSingleton(Home);

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, home, 'Home content fetched successfully'));
});

export const updateHome = asyncHandler(async (req, res) => {
  const home = await getSingleton(Home, req.body);

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, home, 'Home content updated successfully'));
});
