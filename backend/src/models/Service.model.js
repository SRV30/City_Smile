import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  icon: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  slug: { type: String, required: true, lowercase: true, trim: true },
  displayOrder: { type: Number, required: true, default: 0 },
}, { timestamps: true });

serviceSchema.index({ displayOrder: 1, title: 1 });
serviceSchema.index({ slug: 1 }, { unique: true });

export const Service = mongoose.model('Service', serviceSchema);
