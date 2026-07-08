import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/index.js";

const authorize = (...allowedRoles) => {
  return (req, _res, next) => {
    if (!req.admin) {
      throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Authentication required.");
    }

    // If no roles are passed, allow any authenticated admin
    if (!allowedRoles || allowedRoles.length === 0) {
      return next();
    }

    const userRole = req.admin.role;

    if (!allowedRoles.includes(userRole)) {
      throw new ApiError(
        STATUS_CODES.FORBIDDEN,
        "You do not have permission to perform this action."
      );
    }

    next();
  };
};

export const requireSuperAdmin = authorize("SUPER_ADMIN");

export const requireAdmin = authorize("SUPER_ADMIN", "ADMIN");

export default authorize;
