import api from "./api";

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const createAppointment = async (payload) =>
  unwrap(await api.post("/appointments", payload));

export const sendContactMessage = async (payload) =>
  unwrap(await api.post("/contact", payload));
