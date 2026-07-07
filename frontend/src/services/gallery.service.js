import api from './api';

export const getGalleryImages = async (params = {}) => {
  const { page = 1, limit = 12, category = 'All', featured, search } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', limit);

  if (category && category !== 'All') {
    queryParams.append('category', category);
  }

  if (featured) {
    queryParams.append('featured', 'true');
  }

  if (search) {
    queryParams.append('search', search);
  }

  return api.get(`/gallery?${queryParams.toString()}`);
};

export const getGalleryImageById = async (id) => {
  return api.get(`/gallery/${id}`);
};

export const uploadGalleryImages = async (formData) => {
  return api.post('/gallery', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateGalleryImage = async (id, data) => {
  return api.put(`/gallery/${id}`, data);
};

export const deleteGalleryImage = async (id) => {
  return api.delete(`/gallery/${id}`);
};
