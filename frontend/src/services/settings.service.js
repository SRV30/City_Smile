import api from './api';

export const getSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const updateSettings = async (settingsData) => {
  try {
    const response = await api.put('/settings', settingsData);
    return response.data;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};
