import { Appointment } from '../models/Appointment.model.js';
import { Message } from '../models/Message.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { STATUS_CODES } from '../constants/index.js';

export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.create(req.body);
  return res.status(STATUS_CODES.CREATED).json(new ApiResponse(STATUS_CODES.CREATED, appointment, 'Appointment booked successfully'));
});

export const getAppointments = asyncHandler(async (_req, res) => {
  const appointments = await Appointment.find().sort({ createdAt: -1 });
  return res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, appointments, 'Appointments fetched successfully'));
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  return res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, null, 'Appointment deleted successfully'));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const message = await Message.create(req.body);
  return res.status(STATUS_CODES.CREATED).json(new ApiResponse(STATUS_CODES.CREATED, message, 'Message sent successfully'));
});

export const getMessages = asyncHandler(async (_req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  return res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, messages, 'Messages fetched successfully'));
});

export const deleteMessage = asyncHandler(async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  return res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, null, 'Message deleted successfully'));
});
