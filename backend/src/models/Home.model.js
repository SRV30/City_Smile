import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema({
  hero: {
    heading: {
      type: String,
      required: true
    },
    subHeading: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ctaButtons: [
      {
        text: { type: String, required: true },
        link: { type: String, required: true },
        variant: { type: String, default: 'primary' }
      }
    ],
    heroImage: {
      type: String,
      required: true
    },
    statistics: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true }
      }
    ]
  }
}, { timestamps: true });

export const Home = mongoose.model('Home', homeSchema);
