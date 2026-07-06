import mongoose from 'mongoose';

const ctaButtonSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  variant: { type: String, enum: ['primary', 'secondary'], default: 'primary' },
  icon: { type: String, default: '' },
}, { _id: false });

const statisticSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, default: '★' },
}, { _id: false });

const patientAvatarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
}, { _id: false });

const heroSchema = new mongoose.Schema({
  eyebrow: { type: String, default: 'Trusted Dental Care for Your Family' },
  heading: { type: String, required: true, default: 'Healthy Smile, Healthy Life' },
  subHeading: { type: String, required: true, default: 'Healthy Life' },
  description: {
    type: String,
    required: true,
    default: 'Providing world-class dental care with advanced technology and a gentle touch.',
  },
  ctaButtons: {
    type: [ctaButtonSchema],
    default: [
      { label: 'Book Appointment', href: '#appointment', variant: 'primary', icon: 'calendar' },
      { label: 'Call Now', href: 'tel:+918171779011', variant: 'secondary', icon: 'phone' },
    ],
  },
  heroImage: {
    type: String,
    required: true,
    default: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
  },
  heroImageAlt: { type: String, default: 'Dentist treating a smiling patient' },
  patientProofText: { type: String, default: 'Trusted by 5000+ Happy Patients' },
  patientAvatars: {
    type: [patientAvatarSchema],
    default: [
      { name: 'Patient 1', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80' },
      { name: 'Patient 2', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80' },
      { name: 'Patient 3', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80' },
      { name: 'Patient 4', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&q=80' },
    ],
  },
  rating: { type: Number, default: 5 },
  statistics: {
    type: [statisticSchema],
    default: [
      { value: '5000+', label: 'Happy Patients', icon: 'users' },
      { value: '10+', label: 'Years Experience', icon: 'award' },
      { value: 'ISO 9001:2015', label: 'Certified Clinic', icon: 'shield' },
      { value: '4.9/5', label: 'Google Rating', icon: 'star' },
    ],
  },
}, { _id: false });

const homeSchema = new mongoose.Schema({
  hero: { type: heroSchema, default: () => ({}) },
}, { timestamps: true });

export const Home = mongoose.model('Home', homeSchema);
