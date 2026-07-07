import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  deleteAppointment,
  sendMessage,
  getMessages,
  deleteMessage
} from '../../controllers/interaction.controller.js';
import { verifyJWT } from '../../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.post('/appointments', createAppointment);
router.post('/messages', sendMessage);

// Protected routes
router.use(verifyJWT);

router.get('/appointments', getAppointments);
router.delete('/appointments/:id', deleteAppointment);

router.get('/messages', getMessages);
router.delete('/messages/:id', deleteMessage);

export default router;
