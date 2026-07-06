import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Citysmile backend API is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Version endpoint
router.get('/version', (_req, res) => {
  res.status(200).json({
    projectName: 'City Smile Dental Clinic',
    apiVersion: '1.0.0',
    nodeVersion: process.version,
  });
});

export default router;
