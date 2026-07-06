import { Router } from 'express';
// import testimonialRoutes from './testimonialRoutes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Citysmile backend API is running' });
});

// router.use('/testimonials', testimonialRoutes);

export default router;
