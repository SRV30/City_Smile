import { Doctor } from '../models/Doctor.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getSingleton } from '../utils/modelHelpers.js';
import { STATUS_CODES } from '../constants/index.js';

export const getDoctor = asyncHandler(async (_req, res) => {
  const doctor = await getSingleton(Doctor);
  return res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, doctor, 'Doctor profile fetched successfully'));
});

export const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await getSingleton(Doctor, req.body);
  return res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, doctor, 'Doctor profile updated successfully'));
});
