import { Router } from 'express';
import ApiResponse from '../../utils/ApiResponse.js';
import asyncHandler from '../../utils/asyncHandler.js';
import settingsRoutes from './settings.routes.js';
import homeRoutes from './home.routes.js';
import serviceRoutes from './service.routes.js';
import publicContentRoutes from './public-content.routes.js';
import doctorRoutes from './doctor.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', asyncHandler(async (_req, res) => {
  return res.status(200).json(
    new ApiResponse(200, {
      timestamp: new Date().toISOString(),
    }, 'Citysmile backend API is healthy')
  );
}));

// Settings routes
router.use('/settings', settingsRoutes);
router.use('/home', homeRoutes);
router.use('/services', serviceRoutes);
router.use('/doctor', doctorRoutes);
router.use('/', publicContentRoutes);

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
