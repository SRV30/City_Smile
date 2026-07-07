import Admin from "../models/Admin.model.js";

export const seedSuperAdmin = async () => {
  try {
    const exists = await Admin.findOne({
      email: process.env.SUPER_ADMIN_EMAIL,
    });

    if (exists) {
      console.log("✅ Super Admin already exists.");
      return;
    }

    await Admin.create({
      name: process.env.SUPER_ADMIN_NAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: "SUPER_ADMIN",
    });

    console.log("🚀 Super Admin created successfully.");
  } catch (error) {
    console.error("❌ Failed to seed Super Admin");
    console.error(error.message);
  }
};
