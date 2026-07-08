import { Router } from "express";
import {
  login,
  logout,
  refresh,
  me,
  changePassword,
} from "../../controllers/auth.controller.js";
import authenticate from "../../middlewares/authenticate.js";

const router = Router();

/**
 * Public auth routes
 */
router.post("/login", login);
router.post("/refresh", refresh);

/**
 * Protected auth routes
 */
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, me);
router.patch("/change-password", authenticate, changePassword);

export default router;
