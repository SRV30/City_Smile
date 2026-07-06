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

const aboutFeatureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'check' },
}, { _id: false });

const whyChooseUsSchema = new mongoose.Schema({
  eyebrow: { type: String, default: 'Why Choose Us' },
  heading: { type: String, required: true, default: 'Advanced Care, Personal Touch' },
  items: {
    type: [aboutFeatureSchema],
    default: [
      { title: 'Modern Equipment', description: 'Latest technology for better results.', icon: 'equipment' },
      { title: 'Sterilized Clinic', description: 'Hygiene and safety are our priority.', icon: 'sterile' },
      { title: 'Expert Care', description: 'Personalized treatment for every patient.', icon: 'award' },
      { title: 'Comfortable Clinic', description: 'Relaxing environment for stress-free visits.', icon: 'comfort' },
      { title: 'Emergency Care', description: 'Prompt care for dental emergencies.', icon: 'heart' },
    ],
  },
}, { _id: false });

const aboutPreviewSchema = new mongoose.Schema({
  eyebrow: { type: String, default: 'About Us' },
  heading: { type: String, required: true, default: 'Dr. Aditya Shivi' },
  subHeading: { type: String, required: true, default: 'BDS (MIDA) Delhi, IMPLANTOLOGIST' },
  image: {
    type: String,
    required: true,
    default: 'https://res.cloudinary.com/demo/image/upload/w_900,h_1100,c_fill,g_face/docs/doctor.png',
  },
  imageAlt: { type: String, default: 'Dr. Aditya Shivi at City Smile Dental Clinic' },
  experienceBadgeValue: { type: String, default: '10+' },
  experienceBadgeLabel: { type: String, default: 'Years of Experience' },
  highlights: {
    type: [String],
    default: [
      'Ex-Oral & Dental Surgeon, KDC Hospital, Delhi',
      'Ex-Oral & Dental Surgeon, KDC PSDC, Patna',
    ],
  },
  description: {
    type: [String],
    default: [
      'City Smile Dental Clinic has been known for its unparalleled commitment to patient satisfaction. We provide advanced dental care in a friendly and comfortable environment.',
      'Our mission is to make Motihari a 100% oral disease-free city by delivering quality treatment and spreading awareness about oral health.',
    ],
  },
  cta: {
    label: { type: String, default: 'Know More About Us' },
    href: { type: String, default: '#about' },
  },
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
}, { _id: false });

const defaultStatistics = [
  { value: '5000+', label: 'Happy Patients', icon: 'users' },
  { value: '10+', label: 'Years Experience', icon: 'award' },
  { value: 'ISO 9001:2015', label: 'Certified Clinic', icon: 'shield' },
  { value: '4.9/5', label: 'Google Rating', icon: 'star' },
];

const homeSchema = new mongoose.Schema({
  hero: { type: heroSchema, default: () => ({}) },
  statistics: { type: [statisticSchema], default: defaultStatistics },
  aboutPreview: { type: aboutPreviewSchema, default: () => ({}) },
  whyChooseUs: { type: whyChooseUsSchema, default: () => ({}) },
}, { timestamps: true });

export const Home = mongoose.model('Home', homeSchema);
