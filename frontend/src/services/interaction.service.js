import api from "./api";

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const createAppointment = async (payload) => unwrap(await api.post("/interaction/appointments", payload));
export const getAllAppointments = async () => unwrap(await api.get("/interaction/appointments"));
export const deleteAppointment = async (id) => unwrap(await api.delete(`/interaction/appointments/${id}`));

export const sendContactMessage = async (payload) => unwrap(await api.post("/interaction/messages", payload));
export const getAllMessages = async () => unwrap(await api.get("/interaction/messages"));
export const deleteMessage = async (id) => unwrap(await api.delete(`/interaction/messages/${id}`));
