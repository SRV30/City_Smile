import api from './api';

/**
 * Fetch all approved testimonials for public display.
 * @returns {Promise<Object>} - The API response containing testimonials.
 */
export const getApprovedTestimonials = () => api.get('/testimonials');

/**
 * Submit a new testimonial.
 * @param {Object} testimonialData - The testimonial data to submit.
 * @returns {Promise<Object>} - The API response.
 */
export const submitTestimonial = (testimonialData) => api.post('/testimonials', testimonialData);
