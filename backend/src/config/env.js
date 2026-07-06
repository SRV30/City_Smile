import dotenv from 'dotenv';

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  mongoDbName: process.env.MONGODB_DB_NAME || 'citysmile',
  corsOrigin: process.env.ALLOWED_ORIGINS || 'http://localhost:5173',
};

export default env;
