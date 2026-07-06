import mongoose from 'mongoose';
import env from '../config/env.js';
import { Settings } from '../models/Settings.model.js';
import { Home } from '../models/Home.model.js';
import connectDb from './connect.js';

const seedData = {
  clinicName: 'City Smile Dental & Implant Clinic',
  doctorName: 'Dr. Aditya Shivi',
  designation: 'Oral & Dental Surgeon',
  specialization: 'RCT Specialist & Implantologist',
  phone: '+91 81717 79011',
  clinicEmail: 'citysmilebydraditya@gmail.com',
  personalEmail: 'adityashrivastawa1996@gmail.com',
  address: 'NH-28 Devraha Baba Chowk, Near Amber Drug Agency, In Front of Hanuman Mandir, Motihari, Bihar',
  googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.3221681188793!2d84.91794127488664!3d26.670176970472383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993357dc707a59d%3A0x7e82dd9d06646d48!2sCity%20Smile%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1783351746301!5m2!1sen!2sin',
  googleMapUrl: 'https://maps.google.com/?cid=9116603819458276680'
};

const homeSeedData = {
  hero: {
    heading: 'Your Smile, Our Passion: Excellence in Dental Care',
    subHeading: 'Experience Comprehensive & Gentle Dentistry',
    description: 'At City Smile Dental Clinic, we combine advanced technology with a compassionate approach to give you the perfect smile you deserve. From routine checkups to advanced implants, we are here for you.',
    ctaButtons: [
      { text: 'Book Appointment', link: '#appointment', variant: 'primary' },
      { text: 'Explore Services', link: '#services', variant: 'secondary' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop',
    statistics: [
      { value: '10+', label: 'Years Experience' },
      { value: '5000+', label: 'Happy Patients' },
      { value: '15+', label: 'Expert Doctors' }
    ]
  }
};

const seedDatabase = async () => {
  try {
    await connectDb();

    // Seed Settings
    const existingSettings = await Settings.findOne();
    if (existingSettings) {
      console.log('Settings already exist. Updating...');
      await Settings.findOneAndUpdate({}, seedData);
    } else {
      console.log('Creating initial settings...');
      await Settings.create(seedData);
    }

    // Seed Home
    const existingHome = await Home.findOne();
    if (existingHome) {
      console.log('Home content already exists. Updating...');
      await Home.findOneAndUpdate({}, homeSeedData);
    } else {
      console.log('Creating initial home content...');
      await Home.create(homeSeedData);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
