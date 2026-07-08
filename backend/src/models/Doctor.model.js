import mongoose from 'mongoose';

const urlValidator = {
  validator(value) {
    if (!value) return true;
    return /^https?:\/\/.+/i.test(value);
  },
  message: 'Image must be a valid URL',
};

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuingOrganization: { type: String, required: true, trim: true },
  issueDate: { type: Date },
  image: { type: String, required: true, trim: true, validate: urlValidator },
  publicId: { type: String, default: '', trim: true },
}, { _id: false });

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  year: { type: String, required: true, trim: true },
}, { _id: false });

const galleryImageSchema = new mongoose.Schema({
  image: { type: String, required: true, trim: true, validate: urlValidator },
  publicId: { type: String, default: '', trim: true },
  caption: { type: String, required: true, trim: true },
}, { _id: false });

const socialLinksSchema = new mongoose.Schema({
  facebook: { type: String, default: '', trim: true },
  instagram: { type: String, default: '', trim: true },
  youtube: { type: String, default: '', trim: true },
  linkedin: { type: String, default: '', trim: true },
}, { _id: false });

const seoSchema = new mongoose.Schema({
  metaTitle: { type: String, default: 'Dr. Aditya Shivi | City Smile Dental & Implant Clinic' },
  metaDescription: { type: String, default: 'Meet Dr. Aditya Shivi, Oral & Dental Surgeon and RCT Specialist & Implantologist at City Smile Dental & Implant Clinic.' },
}, { _id: false });

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Dr. Aditya Shivi', trim: true },
  designation: { type: String, required: true, default: 'Oral & Dental Surgeon', trim: true },
  specialization: { type: String, required: true, default: 'RCT Specialist & Implantologist', trim: true },
  profileImage: {
    type: String,
    required: true,
    default: 'https://res.cloudinary.com/demo/image/upload/w_900,h_1100,c_fill,g_face/docs/doctor.png',
    trim: true,
    validate: urlValidator,
  },
  shortDescription: {
    type: String,
    default: 'Providing advanced dental care with a calm, patient-first approach and modern clinical standards.',
    trim: true,
  },
  longDescription: {
    type: [String],
    default: [
      'Dr. Aditya Shivi is dedicated to delivering high-quality dental care in a comfortable and friendly environment. His practice focuses on accurate diagnosis, transparent treatment planning, and gentle care for every patient.',
      'With expertise in root canal treatment, dental implants, oral surgery, and smile-focused dentistry, he combines modern technology with personalized attention to help patients achieve healthy, confident smiles.',
    ],
  },
  qualifications: { type: [String], default: ['BDS', 'MIDA Delhi', 'Implantology Training', 'Advanced Endodontic Care'] },
  yearsOfExperience: { type: Number, default: 10, min: 0 },
  certificates: { type: [certificateSchema], default: [] },
  achievements: { type: [achievementSchema], default: [] },
  professionalSkills: {
    type: [String],
    default: ['Root Canal Treatment', 'Dental Implant', 'Cosmetic Dentistry', 'Oral Surgery', 'Smile Designing'],
  },
  gallery: { type: [galleryImageSchema], default: [] },
  socialLinks: { type: socialLinksSchema, default: () => ({}) },
  seo: { type: seoSchema, default: () => ({}) },
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

export const Doctor = mongoose.model('Doctor', doctorSchema);
