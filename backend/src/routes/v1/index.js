import { Router } from 'express';
import * as systemController from '../../controllers/systemController.js';

const router = Router();

// GET /api/v1/health
router.get('/health', systemController.getHealth);

// GET /api/v1/version
router.get('/version', systemController.getVersion);

export default router;
