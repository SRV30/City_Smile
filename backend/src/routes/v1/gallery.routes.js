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

// Public routes
router.route('/')
  .get(getGalleryImages)
  .post(upload.array('images', 20), uploadGalleryImages);

router.route('/:id')
  .get(getGalleryImageById)
  .put(updateGalleryImage)
  .delete(deleteGalleryImage);

export default router;
