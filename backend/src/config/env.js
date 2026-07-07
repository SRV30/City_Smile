import dotenv from "dotenv";

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: process.env.PORT || 5000,

  mongoUri: process.env.MONGODB_URI || "",

  mongoDbName: process.env.MONGODB_DB_NAME || "citysmile",

  corsOrigin: process.env.ALLOWED_ORIGINS || "http://localhost:5173",

  cloudinaryName: process.env.CLOUDINARY_NAME || "",

  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",

  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",

  jwtSecret: process.env.JWT_SECRET,

  jwtExpire: process.env.JWT_EXPIRE || "7d",

  cookieExpire: Number(process.env.COOKIE_EXPIRE) || 7,
};

export default env;
