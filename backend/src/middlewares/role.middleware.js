import ApiError from "../utils/ApiError.js";

const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return next(new ApiError(403, "Access Denied"));
    }

    next();
  };

export default authorize;
