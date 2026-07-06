import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  patientName: { type: String, required: true, trim: true },
  treatment: { type: String, default: '', trim: true },
  quote: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  avatar: { type: String, required: true, trim: true },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

testimonialSchema.index({ displayOrder: 1, patientName: 1 });

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
