import { Gallery } from '../models/Gallery.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import cloudinary from '../config/cloudinary.js';
import { STATUS_CODES } from '../constants/index.js';

/**
 * @desc    Get all active gallery images with filtering, search, and pagination
 * @route   GET /api/v1/gallery
 * @access  Public
 */
export const getGalleryImages = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, category, featured, search } = req.query;

  const query = { isActive: true };

  if (category && category !== 'All') {
    query.category = category;
  }

  if (featured === 'true') {
    query.featured = true;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { caption: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const images = await Gallery.find(query)
    .sort({ displayOrder: 1, uploadedAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Gallery.countDocuments(query);

  return res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, {
      images,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    }, 'Gallery images fetched successfully')
  );
});

/**
 * @desc    Get a single gallery image by ID
 * @route   GET /api/v1/gallery/:id
 * @access  Public
 */
export const getGalleryImageById = asyncHandler(async (req, res) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, 'Gallery image not found');
  }

  return res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, image, 'Gallery image fetched successfully')
  );
});

/**
 * @desc    Upload single or multiple gallery images
 * @route   POST /api/v1/gallery
 * @access  Private/Admin
 */
export const uploadGalleryImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Please upload at least one image');
  }

  const { title, caption, category, displayOrder, featured, isActive } = req.body;

  if (!title || !category) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Title and Category are required');
  }

  const uploadPromises = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'city-smile/gallery',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });
  });

  const uploadResults = await Promise.all(uploadPromises);

  const galleryEntries = uploadResults.map((result) => ({
    title,
    caption,
    category,
    image: result.secure_url,
    publicId: result.public_id,
    displayOrder: displayOrder || 0,
    featured: featured === 'true',
    isActive: isActive !== 'false',
  }));

  const savedImages = await Gallery.insertMany(galleryEntries);

  return res.status(STATUS_CODES.CREATED).json(
    new ApiResponse(STATUS_CODES.CREATED, savedImages, 'Gallery images uploaded successfully')
  );
});

/**
 * @desc    Update a gallery image's metadata
 * @route   PUT /api/v1/gallery/:id
 * @access  Private/Admin
 */
export const updateGalleryImage = asyncHandler(async (req, res) => {
  const { title, caption, category, displayOrder, featured, isActive, enabled } = req.body;

  const image = await Gallery.findById(req.params.id);

  if (!image) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, 'Gallery image not found');
  }

  const updatedImage = await Gallery.findByIdAndUpdate(
    req.params.id,
    {
      title: title || image.title,
      caption: caption !== undefined ? caption : image.caption,
      category: category || image.category,
      displayOrder: displayOrder !== undefined ? displayOrder : image.displayOrder,
      featured: featured !== undefined ? featured : image.featured,
      isActive: isActive !== undefined ? isActive : image.isActive,
      enabled: enabled !== undefined ? enabled : image.enabled,
    },
    { new: true, runValidators: true }
  );

  return res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, updatedImage, 'Gallery image updated successfully')
  );
});

/**
 * @desc    Delete a gallery image from DB and Cloudinary
 * @route   DELETE /api/v1/gallery/:id
 * @access  Private/Admin
 */
export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, 'Gallery image not found');
  }

  // Delete from Cloudinary
  if (image.publicId) {
    await cloudinary.uploader.destroy(image.publicId);
  }

  await Gallery.findByIdAndDelete(req.params.id);

  return res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, null, 'Gallery image deleted successfully')
  );
});
