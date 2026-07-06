import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Home } from '../models/Home.model.js';

export const getHome = asyncHandler(async (_req, res) => {
  const home = await Home.findOneAndUpdate(
    {},
    { $setOnInsert: {} },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, home, 'Home content fetched successfully'));
});

export const updateHome = asyncHandler(async (req, res) => {
  const home = await Home.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, home, 'Home content updated successfully'));
});
