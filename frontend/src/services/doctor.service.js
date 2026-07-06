import api from './api';

export const getDoctor = () => api.get('/doctor');
export const updateDoctor = (payload) => api.put('/doctor', payload);
