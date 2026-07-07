import api from "./api";

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const createService = async (payload) => unwrap(await api.post("/services", payload));
export const updateService = async (id, payload) => unwrap(await api.put(`/services/${id}`, payload));
export const deleteService = async (id) => unwrap(await api.delete(`/services/${id}`));

export const createTestimonial = async (payload) => unwrap(await api.post("/testimonials", payload));
export const updateTestimonial = async (id, payload) => unwrap(await api.put(`/testimonials/${id}`, payload));
export const deleteTestimonial = async (id) => unwrap(await api.delete(`/testimonials/${id}`));

export const createFaq = async (payload) => unwrap(await api.post("/faqs", payload));
export const updateFaq = async (id, payload) => unwrap(await api.put(`/faqs/${id}`, payload));
export const deleteFaq = async (id) => unwrap(await api.delete(`/faqs/${id}`));
