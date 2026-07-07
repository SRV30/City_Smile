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
import adminRoutes from "./admin.routes.js";
import interactionRoutes from "./interaction.routes.js";
import { getDashboardStats } from "../../controllers/stats.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

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
        "Citysmile backend API is healthy"
      )
    );
  })
);

// Settings routes
router.use("/settings", settingsRoutes);
router.use("/home", homeRoutes);
router.use("/services", serviceRoutes);
router.use("/doctor", doctorRoutes);
router.use("/gallery", galleryRoutes);
router.use("/", publicContentRoutes);
router.use("/auth", authRoutes);
router.use("/admins", adminRoutes);
router.use("/interaction", interactionRoutes);
router.get("/stats", verifyJWT, getDashboardStats);

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
