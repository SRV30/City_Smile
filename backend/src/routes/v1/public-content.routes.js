import { Router } from 'express';
import {
  getContact,
  getFaqs,
  getGalleryPreview,
  getTestimonials,
} from '../../controllers/public-content.controller.js';

const router = Router();

router.get('/testimonials', getTestimonials);
router.get('/faqs', getFaqs);
router.get('/gallery-preview', getGalleryPreview);
router.get('/contact', getContact);

export default router;
