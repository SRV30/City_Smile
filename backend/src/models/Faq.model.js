import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

faqSchema.index({ displayOrder: 1, question: 1 });

export const Faq = mongoose.model('Faq', faqSchema);
