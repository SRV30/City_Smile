import { Testimonial } from "../models/Testimonial.model.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/index.js";

/**
 * Create a new testimonial
 * @param {Object} testimonialData
 * @returns {Promise<Testimonial>}
 */
export const createTestimonial = async (testimonialData) => {
  return await Testimonial.create(testimonialData);
};

/**
 * Get all approved 5-star testimonials for public display
 * @returns {Promise<Testimonial[]>}
 */
export const getPublicTestimonials = async () => {
  const testimonials = await Testimonial.find({
    approved: true,
    rating: 5,
  }).sort({
    createdAt: -1,
  });
  return testimonials;
};

/**
 * Get all testimonials for admin management
 * @returns {Promise<Testimonial[]>}
 */
export const getAllTestimonials = async () => {
  return await Testimonial.find().sort({ createdAt: -1 });
};

/**
 * Update testimonial status (approved/featured)
 * @param {string} id
 * @param {Object} updateData
 * @returns {Promise<Testimonial>}
 */
export const updateTestimonialStatus = async (id, updateData) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!testimonial) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Testimonial not found");
  }

  return testimonial;
};

/**
 * Delete a testimonial
 * @param {string} id
 * @returns {Promise<Testimonial>}
 */
export const deleteTestimonial = async (id) => {
  const testimonial = await Testimonial.findByIdAndDelete(id);

  if (!testimonial) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Testimonial not found");
  }

  return testimonial;
};
