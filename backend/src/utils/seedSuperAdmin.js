import Admin from "../models/admin.model.js";
import env from "../config/env.js";

const seedSuperAdmin = async () => {
  const exists = await Admin.findOne({ role: "SUPER_ADMIN" });

  if (exists) return;

  if (!env.superAdminEmail || !env.superAdminPassword) {
    throw new Error("SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required");
  }

  await Admin.create({
    name: "Super Admin",
    email: env.superAdminEmail,
    password: env.superAdminPassword, // plaintext here; model hook hashes it once
    role: "SUPER_ADMIN",
    isActive: true,
  });

  console.log("Super Admin Created");
};

export default seedSuperAdmin;
