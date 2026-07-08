import { Contact } from '../models/Contact.model.js';
import { Faq } from '../models/Faq.model.js';
import { GalleryPreview } from '../models/GalleryPreview.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ensureDefaults, getSingleton } from '../utils/modelHelpers.js';
import { STATUS_CODES } from '../constants/index.js';

const defaultFaqs = [
  { question: 'How can I book an appointment?', answer: 'You can book an appointment from the homepage form or call the clinic directly during opening hours.', displayOrder: 1 },
  { question: 'Do you provide painless dental treatments?', answer: 'Yes. We use modern techniques and a patient-first approach to make treatment as comfortable as possible.', displayOrder: 2 },
  { question: 'Where is City Smile Dental & Implant Clinic located?', answer: 'The clinic is located at NH-28, Devraha Baba Chowk, Motihari, Bihar.', displayOrder: 3 },
  { question: 'What dental services are available?', answer: 'We provide dental implants, root canal treatment, teeth whitening, dental X-rays, braces, aligners, and tooth extraction.', displayOrder: 4 },
];

export const getFaqs = asyncHandler(async (_req, res) => {
  await ensureDefaults(Faq, defaultFaqs);
  const faqs = await Faq.find().sort({ displayOrder: 1, question: 1 });
  return res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, faqs, 'FAQs fetched successfully'));
});

export const getGalleryPreview = asyncHandler(async (_req, res) => {
  const galleryPreview = await getSingleton(GalleryPreview);
  galleryPreview.images.sort((a, b) => a.displayOrder - b.displayOrder);
  return res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, galleryPreview, 'Gallery preview fetched successfully'));
});

export const getContact = asyncHandler(async (_req, res) => {
  const contact = await getSingleton(Contact);
  return res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, contact, 'Contact content fetched successfully'));
});
