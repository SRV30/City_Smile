import * as testimonialService from "../services/testimonial.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/index.js";
import {
  createTestimonialSchema,
  updateTestimonialStatusSchema,
} from "../validators/testimonial.validator.js";

/**
 * Public: Submit a testimonial
 */
export const submitTestimonial = asyncHandler(async (req, res) => {
  const validatedData = createTestimonialSchema.parse(req.body);

  const testimonial = await testimonialService.createTestimonial({
    ...validatedData,
    approved: true,
    featured: true,
  });

  return res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        testimonial,
        "Testimonial submitted successfully and is awaiting approval"
      )
    );
});

/**
 * Public: Get approved testimonials
 */
export const getPublicTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await testimonialService.getPublicTestimonials();

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        testimonials,
        "Approved testimonials fetched successfully"
      )
    );
});

/**
 * Admin: Get all testimonials
 */
export const getAdminTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await testimonialService.getAllTestimonials();

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        testimonials,
        "All testimonials fetched successfully"
      )
    );
});

/**
 * Admin: Approve/Unapprove testimonial
 */
export const toggleApproval = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { approved } = updateTestimonialStatusSchema.parse(req.body);

  const testimonial = await testimonialService.updateTestimonialStatus(id, {
    approved,
  });

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        testimonial,
        `Testimonial ${approved ? "approved" : "unapproved"} successfully`
      )
    );
});

/**
 * Admin: Feature/Unfeature testimonial
 */
export const toggleFeatured = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { featured } = updateTestimonialStatusSchema.parse(req.body);

  const testimonial = await testimonialService.updateTestimonialStatus(id, {
    featured,
  });

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        testimonial,
        `Testimonial ${featured ? "marked as featured" : "removed from featured"} successfully`
      )
    );
});

/**
 * Admin: Delete testimonial
 */
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await testimonialService.deleteTestimonial(id);

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Testimonial deleted successfully")
    );
});
