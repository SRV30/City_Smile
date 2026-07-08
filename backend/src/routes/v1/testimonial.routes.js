import { Router } from "express";
import {
  submitTestimonial,
  getPublicTestimonials,
  getAdminTestimonials,
  toggleApproval,
  toggleFeatured,
  deleteTestimonial,
} from "../../controllers/testimonial.controller.js";
import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";

const publicRouter = Router();
const adminRouter = Router();

/**
 * Public routes
 * Mounted at /api/v1/testimonials
 */
publicRouter.route("/").get(getPublicTestimonials).post(submitTestimonial);

/**
 * Admin routes
 * Mounted at /api/v1/admin/testimonials
 */
adminRouter.use(authenticate);
adminRouter.use(authorize("SUPER_ADMIN", "ADMIN"));

adminRouter.route("/").get(getAdminTestimonials);
adminRouter.route("/:id/approve").patch(toggleApproval);
adminRouter.route("/:id/feature").patch(toggleFeatured);
adminRouter.route("/:id").delete(deleteTestimonial);

export { publicRouter, adminRouter };
