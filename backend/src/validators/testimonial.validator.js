import { z } from "zod";

export const createTestimonialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  service: z
    .string()
    .trim()
    .min(2, "Service must be at least 2 characters")
    .max(100, "Service must not exceed 100 characters"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  review: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must not exceed 1000 characters"),
});

export const updateTestimonialStatusSchema = z.object({
  approved: z.boolean().optional(),
  featured: z.boolean().optional(),
});
