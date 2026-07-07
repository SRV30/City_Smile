import api from "./api";

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const uploadGalleryImages = async (formData) => {
  const response = await api.post("/gallery", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return unwrap(response);
};

export const updateGalleryImage = async (id, payload) => unwrap(await api.put(`/gallery/${id}`, payload));

export const deleteGalleryImage = async (id) => unwrap(await api.delete(`/gallery/${id}`));
