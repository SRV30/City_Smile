import jwt from "jsonwebtoken";
import env from "../config/env.js";

const assertSecrets = () => {
  if (!env.jwtAccessSecret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }

  if (!env.jwtRefreshSecret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
};

export const generateAccessToken = (admin) => {
  assertSecrets();

  return jwt.sign(
    {
      id: admin._id.toString(),
      role: admin.role,
      tokenVersion: admin.tokenVersion ?? 0,
    },
    env.jwtAccessSecret,
    {
      expiresIn: env.accessTokenExpires,
    }
  );
};

export const generateRefreshToken = (admin) => {
  assertSecrets();

  return jwt.sign(
    {
      id: admin._id.toString(),
      tokenVersion: admin.tokenVersion ?? 0,
    },
    env.jwtRefreshSecret,
    {
      expiresIn: env.refreshTokenExpires,
    }
  );
};

export const verifyAccessToken = (token) => {
  assertSecrets();
  return jwt.verify(token, env.jwtAccessSecret);
};

export const verifyRefreshToken = (token) => {
  assertSecrets();
  return jwt.verify(token, env.jwtRefreshSecret);
};

export const decodeToken = (token) => jwt.decode(token);
