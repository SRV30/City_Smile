import { Router } from "express";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import settingsRoutes from "./settings.routes.js";
import homeRoutes from "./home.routes.js";
import serviceRoutes from "./service.routes.js";
import publicContentRoutes from "./publicContent.routes.js";
import doctorRoutes from "./doctor.routes.js";
import galleryRoutes from "./gallery.routes.js";
import authRoutes from "./auth.routes.js";
import { publicRouter as testimonialRoutes, adminRouter as adminTestimonialRoutes } from "./testimonial.routes.js";
import { STATUS_CODES } from "../../constants/index.js";

const router = Router();

// Health check endpoint
router.get(
  "/health",
  asyncHandler(async (_req, res) => {
    return res.status(STATUS_CODES.OK).json(
      new ApiResponse(
        STATUS_CODES.OK,
        {
          timestamp: new Date().toISOString(),
        },
        "CitySmile backend API is healthy"
      )
    );
  })
);

// Auth routes
router.use("/admin/auth", authRoutes);

// Admin CMS routes
router.use("/admin/testimonials", adminTestimonialRoutes);

// Public CMS/content routes
router.use("/settings", settingsRoutes);
router.use("/home", homeRoutes);
router.use("/services", serviceRoutes);
router.use("/doctor", doctorRoutes);
router.use("/gallery", galleryRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/", publicContentRoutes);

// Version endpoint
router.get(
  "/version",
  asyncHandler(async (_req, res) => {
    return res.status(STATUS_CODES.OK).json(
      new ApiResponse(
        STATUS_CODES.OK,
        {
          projectName: "City Smile Dental Clinic",
          apiVersion: "1.0.0",
          nodeVersion: process.version,
        },
        "API version fetched successfully"
      )
    );
  })
);

export default router;
