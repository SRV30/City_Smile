import { Contact } from '../models/Contact.model.js';
import { Faq } from '../models/Faq.model.js';
import { GalleryPreview } from '../models/GalleryPreview.model.js';
import { Testimonial } from '../models/Testimonial.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const defaultTestimonials = [
  { patientName: 'Rakesh Kumar', treatment: 'Dental Implant', quote: 'Very professional and friendly doctor. My dental implant was completely painless. Highly recommended!', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80', displayOrder: 1 },
  { patientName: 'Priya Sharma', treatment: 'Root Canal', quote: 'The best dental clinic in Motihari. Clean environment and advanced treatment.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80', displayOrder: 2 },
  { patientName: 'Anil Verma', treatment: 'Dental Care', quote: 'Highly recommended for anyone looking for quality dental care.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=96&q=80', displayOrder: 3 },
];

const defaultFaqs = [
  { question: 'How can I book an appointment?', answer: 'You can book an appointment from the homepage form or call the clinic directly during opening hours.', displayOrder: 1 },
  { question: 'Do you provide painless dental treatments?', answer: 'Yes. We use modern techniques and a patient-first approach to make treatment as comfortable as possible.', displayOrder: 2 },
  { question: 'Where is City Smile Dental Clinic located?', answer: 'The clinic is located at NH-28, Devraha Baba Chowk, Motihari, Bihar.', displayOrder: 3 },
  { question: 'What dental services are available?', answer: 'We provide dental implants, root canal treatment, teeth whitening, dental X-rays, braces, aligners, and tooth extraction.', displayOrder: 4 },
];

const ensureCollectionDefaults = async (Model, defaults) => {
  const count = await Model.countDocuments();
  if (count === 0) await Model.insertMany(defaults, { ordered: true });
};

export const getTestimonials = asyncHandler(async (_req, res) => {
  await ensureCollectionDefaults(Testimonial, defaultTestimonials);
  const testimonials = await Testimonial.find().sort({ displayOrder: 1, patientName: 1 });
  return res.status(200).json(new ApiResponse(200, testimonials, 'Testimonials fetched successfully'));
});

export const getFaqs = asyncHandler(async (_req, res) => {
  await ensureCollectionDefaults(Faq, defaultFaqs);
  const faqs = await Faq.find().sort({ displayOrder: 1, question: 1 });
  return res.status(200).json(new ApiResponse(200, faqs, 'FAQs fetched successfully'));
});

export const getGalleryPreview = asyncHandler(async (_req, res) => {
  const galleryPreview = await GalleryPreview.findOneAndUpdate(
    {},
    { $setOnInsert: {} },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  galleryPreview.images.sort((a, b) => a.displayOrder - b.displayOrder);
  return res.status(200).json(new ApiResponse(200, galleryPreview, 'Gallery preview fetched successfully'));
});

export const getContact = asyncHandler(async (_req, res) => {
  const contact = await Contact.findOneAndUpdate(
    {},
    { $setOnInsert: {} },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  return res.status(200).json(new ApiResponse(200, contact, 'Contact content fetched successfully'));
});
