import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  eyebrow: { type: String, default: 'Need Help?' },
  heading: { type: String, default: 'Get in Touch Today!' },
  description: { type: String, default: 'Your perfect smile is just a call away. We are here to help you.' },
  formEyebrow: { type: String, default: 'Book Appointment' },
  formHeading: { type: String, default: 'Book Your Appointment' },
  submitLabel: { type: String, default: 'Book Appointment' },
  contactHeading: { type: String, default: 'We are here to help you' },
  contactDescription: { type: String, default: 'Reach out to City Smile Dental & Implant Clinic for any inquiries.' },
  mapCardTitle: { type: String, default: 'City Smile Dental & Implant Clinic' },
}, { timestamps: true });

export const Contact = mongoose.model('Contact', contactSchema);
