import api from "./api";

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const fetchSettings = async () => unwrap(await api.get("/settings"));
export const fetchHome = async () => unwrap(await api.get("/home"));
export const fetchDoctor = async () => unwrap(await api.get("/doctor"));

export const fetchGallery = async (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const qs = search.toString();
  return unwrap(await api.get(`/gallery${qs ? `?${qs}` : ""}`));
};

export const fetchServices = async () => unwrap(await api.get("/services"));
export const fetchServiceBySlug = async (slug) =>
  unwrap(await api.get(`/services/${slug}`));
export const fetchTestimonials = async () =>
  unwrap(await api.get("/testimonials"));
export const fetchFaqs = async () => unwrap(await api.get("/faqs"));

export const updateSettings = async (payload) =>
  unwrap(await api.put("/settings", payload));
export const updateHome = async (payload) =>
  unwrap(await api.put("/home", payload));
export const updateDoctor = async (payload) =>
  unwrap(await api.put("/doctor", payload));
