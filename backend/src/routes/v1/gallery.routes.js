import { Router } from 'express';
import {
  getGalleryImages,
  getGalleryImageById,
  uploadGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
} from '../../controllers/gallery.controller.js';
import { upload } from '../../middlewares/upload.middleware.js';

const router = Router();

import { verifyJWT } from '../../middlewares/auth.middleware.js';

// Public routes
router.route('/')
  .get(getGalleryImages);

router.route('/:id')
  .get(getGalleryImageById);

// Protected routes
router.use(verifyJWT);

router.route('/')
  .post(upload.array('images', 20), uploadGalleryImages);

router.route('/:id')
  .put(updateGalleryImage)
  .delete(deleteGalleryImage);

export default router;
