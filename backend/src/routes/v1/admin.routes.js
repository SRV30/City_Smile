import { Router } from "express";
import {
  createAdmin,
  deactivateAdmin,
  getAllAdmins,
  reactivateAdmin,
  updateAdmin,
} from "../../controllers/admin.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT, authorize("SUPER_ADMIN"));

router.get("/", getAllAdmins);
router.post("/", createAdmin);
router.put("/:id", updateAdmin);
router.patch("/:id/deactivate", deactivateAdmin);
router.patch("/:id/reactivate", reactivateAdmin);

export default router;
