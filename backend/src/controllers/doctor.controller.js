import { Doctor } from '../models/Doctor.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const getSingletonDoctor = (update = { $setOnInsert: {} }) => Doctor.findOneAndUpdate(
  {},
  update,
  { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
);

export const getDoctor = asyncHandler(async (_req, res) => {
  const doctor = await getSingletonDoctor();
  return res.status(200).json(new ApiResponse(200, doctor, 'Doctor profile fetched successfully'));
});

export const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await getSingletonDoctor(req.body);
  return res.status(200).json(new ApiResponse(200, doctor, 'Doctor profile updated successfully'));
});
