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
router.get('/', getGalleryImages);
router.get('/:id', getGalleryImageById);

// Admin routes (TODO: Add auth middleware when authentication is implemented)
router.post('/', upload.array('images', 20), uploadGalleryImages);
router.put('/:id', updateGalleryImage);
router.delete('/:id', deleteGalleryImage);

export default router;
