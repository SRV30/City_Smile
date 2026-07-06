import api from './api';

export const getTestimonials = () => api.get('/testimonials');
export const getFaqs = () => api.get('/faqs');
export const getGalleryPreview = () => api.get('/gallery-preview');
export const getContactContent = () => api.get('/contact');
