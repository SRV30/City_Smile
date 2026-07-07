import Admin from "../models/Admin.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const safeAdminFields = "-password";

const getActiveSuperAdminCount = async () => {
  return Admin.countDocuments({
    role: "SUPER_ADMIN",
    isActive: true,
  });
};

const ensureCanAssignRole = (req, requestedRole) => {
  if (
    requestedRole === "SUPER_ADMIN" &&
    req.admin.role !== "SUPER_ADMIN"
  ) {
    throw new ApiError(
      403,
      "Only SUPER_ADMIN can create or assign SUPER_ADMIN role."
    );
  }
};

const ensureNotLastSuperAdmin = async (admin, nextRole, nextIsActive) => {
  const isCurrentlySuperAdmin = admin.role === "SUPER_ADMIN";
  const isBeingDemoted =
    typeof nextRole !== "undefined" &&
    nextRole !== "SUPER_ADMIN";

  const isBeingDeactivated =
    typeof nextIsActive !== "undefined" &&
    nextIsActive === false;

  if (isCurrentlySuperAdmin && (isBeingDemoted || isBeingDeactivated)) {
    const activeSuperAdmins = await getActiveSuperAdminCount();

    if (activeSuperAdmins === 1) {
      throw new ApiError(
        400,
        "Cannot deactivate or demote the last SUPER_ADMIN."
      );
    }
  }
};

export const getAllAdmins = asyncHandler(async (_req, res) => {
  const admins = await Admin.find()
    .select(safeAdminFields)
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, admins, "Admins fetched successfully")
    );
});

export const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body || {};

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required.");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const requestedRole = role || "ADMIN";

  ensureCanAssignRole(req, requestedRole);

  const exists = await Admin.findOne({
    email: normalizedEmail,
  });

  if (exists) {
    throw new ApiError(409, "Admin already exists.");
  }

  const admin = await Admin.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: requestedRole,
    createdBy: req.admin._id,
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    safeAdminFields
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdAdmin,
        "Admin created successfully."
      )
    );
});

export const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, role, isActive } = req.body || {};

  const admin = await Admin.findById(id);

  if (!admin) {
    throw new ApiError(404, "Admin not found.");
  }

  if (req.admin._id.toString() === id) {
    if (typeof role !== "undefined" && role !== req.admin.role) {
      throw new ApiError(
        400,
        "You cannot change your own role."
      );
    }
  }

  if (typeof role !== "undefined") {
    if (req.admin.role !== "SUPER_ADMIN") {
      throw new ApiError(
        403,
        "Only SUPER_ADMIN can change roles."
      );
    }

    await ensureNotLastSuperAdmin(admin, role, isActive);

    ensureCanAssignRole(req, role);
    admin.role = role;
  }

  if (typeof isActive !== "undefined") {
    if (admin.role === "SUPER_ADMIN") {
      await ensureNotLastSuperAdmin(admin, role, isActive);
    }

    admin.isActive = isActive;
  }

  if (typeof name !== "undefined") {
    admin.name = name.trim();
  }

  await admin.save({
    validateBeforeSave: false,
  });

  const updatedAdmin = await Admin.findById(admin._id).select(
    safeAdminFields
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedAdmin,
        "Admin updated successfully."
      )
    );
});

export const deactivateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.admin._id.toString() === id) {
    throw new ApiError(
      400,
      "You cannot deactivate yourself."
    );
  }

  const admin = await Admin.findById(id);

  if (!admin) {
    throw new ApiError(404, "Admin not found.");
  }

  if (!admin.isActive) {
    throw new ApiError(
      400,
      "Admin is already inactive."
    );
  }

  await ensureNotLastSuperAdmin(admin, undefined, false);

  admin.isActive = false;
  await admin.save({
    validateBeforeSave: false,
  });

  const updatedAdmin = await Admin.findById(admin._id).select(
    safeAdminFields
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedAdmin,
        "Admin deactivated successfully."
      )
    );
});

export const reactivateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(id);

  if (!admin) {
    throw new ApiError(404, "Admin not found.");
  }

  if (admin.isActive) {
    throw new ApiError(
      400,
      "Admin is already active."
    );
  }

  admin.isActive = true;
  await admin.save({
    validateBeforeSave: false,
  });

  const updatedAdmin = await Admin.findById(admin._id).select(
    safeAdminFields
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedAdmin,
        "Admin reactivated successfully."
      )
    );
});