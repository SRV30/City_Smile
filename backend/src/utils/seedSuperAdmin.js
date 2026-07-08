import Admin from "../models/admin.model.js";
import { hashPassword } from "./password.js";

const seedSuperAdmin = async () => {
  const exists = await Admin.findOne({
    role: "SUPER_ADMIN",
  });

  if (exists) return;

  const password = await hashPassword(process.env.SUPER_ADMIN_PASSWORD);

  await Admin.create({
    name: "Super Admin",

    email: process.env.SUPER_ADMIN_EMAIL,

    password,

    role: "SUPER_ADMIN",
  });

  console.log("Super Admin Created");
};

export default seedSuperAdmin;
