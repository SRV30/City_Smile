import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Home } from '../models/Home.model.js';

// Fallback data if DB is empty
const seedData = {
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

/**
 * Get singleton home content
 * GET /api/v1/home
 */
export const getHome = asyncHandler(async (req, res) => {
  let home;
  try {
    home = await Home.findOne();
  } catch (error) {
    console.error("Database connection failed, using fallback data:", error.message);
  }

  if (!home) {
    return res
      .status(200)
      .json(new ApiResponse(200, seedData, "Home content fetched successfully (Fallback)"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, home, "Home content fetched successfully"));
});

/**
 * Update home content
 * PUT /api/v1/home
 */
export const updateHome = asyncHandler(async (req, res) => {
  let home;
  try {
    home = await Home.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
  } catch (error) {
     return res
      .status(500)
      .json(new ApiResponse(500, null, "Database error: " + error.message));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, home, "Home content updated successfully"));
});
