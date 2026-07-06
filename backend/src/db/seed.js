import mongoose from 'mongoose';
import env from '../config/env.js';
import { Settings } from '../models/Settings.model.js';
import connectDb from './connect.js';

const seedData = {
  clinicName: 'City Smile Dental & Implant Clinic',
  doctorName: 'Dr. Aditya Shivi',
  designation: 'Oral & Dental Surgeon',
  specialization: 'RCT Specialist & Implantologist',
  address: 'NH-28 Devraha Baba Chowk, Near Amber Drug Agency, In Front of Hanuman Mandir, Motihari, Bihar',
  emailClinic: 'citysmilebydraditya@gmail.com',
  emailPersonal: 'adityashrivastawa1996@gmail.com',
  phone: '+91 81717 79011',
  googleMapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.52550346387!2d84.91923057538221!3d26.658866776800726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993350027f673ef%3A0xe6759fc14757c91d!2sCity%20Smile%20Dental%20And%20Implant%20Clinic!5e0!3m2!1sen!2sin!4v1740921448202!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
};

const seedDatabase = async () => {
  try {
    await connectDb();

    // Check if settings already exist
    const existingSettings = await Settings.findOne();

    if (existingSettings) {
      console.log('Settings already exist. Updating with seed data...');
      await Settings.findOneAndUpdate({}, seedData);
    } else {
      console.log('No settings found. Creating initial settings...');
      await Settings.create(seedData);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
