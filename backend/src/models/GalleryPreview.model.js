import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  alt: { type: String, required: true, trim: true },
  displayOrder: { type: Number, default: 0 },
}, { _id: false });

const galleryPreviewSchema = new mongoose.Schema({
  eyebrow: { type: String, default: 'Our Gallery' },
  heading: { type: String, default: 'Moments of Healthy Smiles' },
  ctaLabel: { type: String, default: 'View Full Gallery' },
  ctaHref: { type: String, default: '/gallery' },
  images: {
    type: [galleryImageSchema],
    default: [
      { title: 'Dental care', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=700&q=85', alt: 'Dentist treating patient', displayOrder: 1 },
      { title: 'Modern clinic', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=85', alt: 'Modern dental clinic', displayOrder: 2 },
      { title: 'Patient consultation', image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=700&q=85', alt: 'Patient consultation', displayOrder: 3 },
      { title: 'Quality treatment', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=700&q=85', alt: 'Happy dental patient', displayOrder: 4 },
    ],
  },
}, { timestamps: true });

export const GalleryPreview = mongoose.model('GalleryPreview', galleryPreviewSchema);
