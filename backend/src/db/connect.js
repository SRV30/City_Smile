import mongoose from 'mongoose';
import env from '../config/env.js';

const connectDb = async () => {
  if (!env.mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  const conn = await mongoose.connect(env.mongoUri, {
    dbName: env.mongoDbName,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDb;
