import { Router } from 'express';
import {
  createService,
  deleteService,
  getServiceBySlug,
  getServices,
  updateService,
} from '../../controllers/service.controller.js';

const router = Router();

router.route('/')
  .get(getServices)
  .post(createService);

router.route('/:slug')
  .get(getServiceBySlug);

router.route('/:id')
  .put(updateService)
  .delete(deleteService);

export default router;
