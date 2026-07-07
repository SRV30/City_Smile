import env from "../config/env.js";

export const cookieOptions = {
  httpOnly: true,

  secure: env.nodeEnv === "production",

  sameSite: env.nodeEnv === "production" ? "none" : "lax",

  maxAge: env.cookieExpire * 24 * 60 * 60 * 1000,
};
