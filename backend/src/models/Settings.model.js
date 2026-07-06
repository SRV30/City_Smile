import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    required: true,
    default: 'City Smile Dental & Implant Clinic'
  },
  doctorName: {
    type: String,
    required: true,
    default: 'Dr. Aditya Shivi'
  },
  designation: {
    type: String,
    required: true,
    default: 'Oral & Dental Surgeon'
  },
  specialization: {
    type: String,
    required: true,
    default: 'RCT Specialist & Implantologist'
  },
  address: {
    type: String,
    required: true
  },
  emailClinic: {
    type: String,
    required: true
  },
  emailPersonal: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  googleMapEmbed: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Settings = mongoose.model('Settings', settingsSchema);
