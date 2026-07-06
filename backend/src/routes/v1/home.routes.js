import { Router } from 'express';
import { getHome, updateHome } from '../../controllers/home.controller.js';

const router = Router();

router.route('/').get(getHome).put(updateHome);

export default router;
