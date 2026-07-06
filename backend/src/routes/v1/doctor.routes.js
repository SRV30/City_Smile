import { Router } from 'express';
import { getDoctor, updateDoctor } from '../../controllers/doctor.controller.js';

const router = Router();

router.route('/').get(getDoctor).put(updateDoctor);

export default router;
