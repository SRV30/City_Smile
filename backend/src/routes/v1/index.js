import { Router } from 'express';

const router = Router();

// GET /api/v1/health
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

// GET /api/v1/version
router.get('/version', (_req, res) => {
  res.status(200).json({
    projectName: 'City Smile Dental Clinic',
    apiVersion: '1.0.0',
    nodeVersion: process.version,
  });
});

export default router;
