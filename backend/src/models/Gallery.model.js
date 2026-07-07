import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  caption: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Clinic', 'Treatment', 'Camp', 'Certificates', 'Events', 'BeforeAfter', 'Others'],
      message: '{VALUE} is not a valid category',
    },
    index: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  publicId: {
    type: String,
    required: [true, 'Public ID is required'],
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true,
  },
  featured: {
    type: Boolean,
    default: false,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Compound index for optimized fetching
gallerySchema.index({ category: 1, displayOrder: 1, uploadedAt: -1 });
gallerySchema.index({ featured: 1, displayOrder: 1 });

export const Gallery = mongoose.model('Gallery', gallerySchema);
