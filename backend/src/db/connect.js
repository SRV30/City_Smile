import mongoose from 'mongoose';
import env from '../config/env.js';

const connectDb = async () => {
  if (!env.mongoUri) throw new Error('MONGODB_URI is required');
  await mongoose.connect(env.mongoUri, { dbName: env.mongoDbName });
};

export default connectDb;
