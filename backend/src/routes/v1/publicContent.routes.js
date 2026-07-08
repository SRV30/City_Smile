import { Router } from 'express';
import {
  getContact,
  getFaqs,
  getGalleryPreview,
} from '../../controllers/publicContent.controller.js';

const router = Router();

router.route('/faqs').get(getFaqs);
router.route('/gallery-preview').get(getGalleryPreview);
router.route('/contact').get(getContact);

export default router;
