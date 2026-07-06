import { Router } from 'express';
import ApiResponse from '../../utils/ApiResponse.js';
import asyncHandler from '../../utils/asyncHandler.js';

const router = Router();

// Health check endpoint
router.get('/health', asyncHandler(async (_req, res) => {
  return res.status(200).json(
    new ApiResponse(200, {
      timestamp: new Date().toISOString(),
    }, 'Citysmile backend API is healthy')
  );
}));

// Version endpoint
router.get('/version', asyncHandler(async (_req, res) => {
  return res.status(200).json(
    new ApiResponse(200, {
      projectName: 'City Smile Dental Clinic',
      apiVersion: '1.0.0',
      nodeVersion: process.version,
    }, 'API version fetched successfully')
  );
}));

export default router;
