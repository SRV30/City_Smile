import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateToken = (adminId) => {
  return jwt.sign(
    {
      id: adminId,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpire,
    }
  );
};
