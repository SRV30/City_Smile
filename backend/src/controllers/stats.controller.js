import { Appointment } from '../models/Appointment.model.js';
import { Message } from '../models/Message.model.js';
import { Service } from '../models/Service.model.js';
import { Gallery } from '../models/Gallery.model.js';
import Admin from '../models/Admin.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { STATUS_CODES } from '../constants/index.js';

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [appointments, messages, services, gallery, admins] = await Promise.all([
    Appointment.countDocuments(),
    Message.countDocuments(),
    Service.countDocuments(),
    Gallery.countDocuments(),
    Admin.countDocuments()
  ]);

  return res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, {
      appointments,
      messages,
      services,
      gallery,
      admins
    }, 'Stats fetched successfully')
  );
});
