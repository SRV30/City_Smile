import api from './api';

export const getHome = () => api.get('/home');
export const updateHome = (payload) => api.put('/home', payload);
