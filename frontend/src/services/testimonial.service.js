import api from './api';

/**
 * Fetch all approved testimonials for public display.
 * @returns {Promise<Object>} - The API response containing testimonials.
 */
export const getApprovedTestimonials = () => api.get('/testimonials');
