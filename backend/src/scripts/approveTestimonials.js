import mongoose from 'mongoose';
import env from '../config/env.js';
import { Testimonial } from '../models/Testimonial.model.js';
import connectDb from '../db/connect.js';

const approveAll = async () => {
  try {
    await connectDb();
    const result = await Testimonial.updateMany(
      { rating: 5 },
      { $set: { approved: true } }
    );
    console.log(`Successfully approved ${result.modifiedCount} testimonials.`);
    process.exit(0);
  } catch (error) {
    console.error('Error approving testimonials:', error.message);
    process.exit(1);
  }
};

approveAll();
