import { Router } from "express";
import {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
  changePassword,
} from "../../controllers/auth.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", verifyJWT, getCurrentAdmin);
router.put("/change-password", verifyJWT, changePassword);

export default router;
