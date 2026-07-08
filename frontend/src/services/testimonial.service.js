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

/**
 * Fetch all testimonials for admin management.
 * @returns {Promise<Object>} - The API response containing all testimonials.
 */
export const getAllTestimonials = () => api.get('/admin/testimonials');

/**
 * Approve a testimonial.
 * @param {string} id - The ID of the testimonial to approve.
 * @param {boolean} approved - The approval status.
 * @returns {Promise<Object>} - The API response.
 */
export const toggleApproval = (id, approved) => api.patch(`/admin/testimonials/${id}/approve`, { approved });

/**
 * Feature a testimonial.
 * @param {string} id - The ID of the testimonial to feature.
 * @param {boolean} featured - The featured status.
 * @returns {Promise<Object>} - The API response.
 */
export const toggleFeatured = (id, featured) => api.patch(`/admin/testimonials/${id}/feature`, { featured });

/**
 * Delete a testimonial.
 * @param {string} id - The ID of the testimonial to delete.
 * @returns {Promise<Object>} - The API response.
 */
export const deleteTestimonial = (id) => api.delete(`/admin/testimonials/${id}`);
