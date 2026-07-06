import { Service } from '../models/Service.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const defaultServices = [
  {
    title: 'Dental Implants',
    description: 'Permanent solution for missing teeth.',
    icon: 'implant',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=85',
    slug: 'dental-implants',
    displayOrder: 1,
  },
  {
    title: 'Root Canal Treatment',
    description: 'Save your natural tooth with precision.',
    icon: 'tooth',
    image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=900&q=85',
    slug: 'root-canal-treatment',
    displayOrder: 2,
  },
  {
    title: 'Teeth Whitening',
    description: 'Brighten your smile with advanced technology.',
    icon: 'tooth-sparkle',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=85',
    slug: 'teeth-whitening',
    displayOrder: 3,
  },
  {
    title: 'Dental X-Ray',
    description: 'Advanced imaging for accurate diagnosis.',
    icon: 'xray',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=900&q=85',
    slug: 'dental-x-ray',
    displayOrder: 4,
  },
  {
    title: 'Braces & Aligners',
    description: 'Straighten your teeth for a perfect smile.',
    icon: 'aligners',
    image: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=900&q=85',
    slug: 'braces-aligners',
    displayOrder: 5,
  },
  {
    title: 'Tooth Extraction',
    description: 'Safe & painless tooth removal.',
    icon: 'extraction',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=85',
    slug: 'tooth-extraction',
    displayOrder: 6,
  },
];

const ensureDefaultServices = async () => {
  const count = await Service.countDocuments();

  if (count === 0) {
    await Service.insertMany(defaultServices, { ordered: true });
  }
};

export const getServices = asyncHandler(async (_req, res) => {
  await ensureDefaultServices();
  const services = await Service.find().sort({ displayOrder: 1, title: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, services, 'Services fetched successfully'));
});

export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, 'Service fetched successfully'));
});

export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, service, 'Service created successfully'));
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, 'Service updated successfully'));
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, 'Service deleted successfully'));
});
