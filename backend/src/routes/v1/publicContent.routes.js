import { Router } from 'express';
import {
  getContact,
  getFaqs,
  getGalleryPreview,
  getTestimonials,
} from '../../controllers/publicContent.controller.js';

const router = Router();

router.route('/testimonials').get(getTestimonials);
router.route('/faqs').get(getFaqs);
router.route('/gallery-preview').get(getGalleryPreview);
router.route('/contact').get(getContact);

export default router;
