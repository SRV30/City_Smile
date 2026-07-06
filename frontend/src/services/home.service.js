import api from './api';

export const getHomeData = async () => {
  try {
    // The api interceptor already returns response.data (the body)
    const response = await api.get('/home');
    return response;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

export const updateHomeData = async (data) => {
  try {
    const response = await api.put('/home', data);
    return response;
  } catch (error) {
    console.error('Error updating home data:', error);
    throw error;
  }
};
