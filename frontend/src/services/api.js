import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // If we get a 401 from the API, it means the session is expired or invalid
    if (error.response?.status === 401 && !window.location.pathname.includes('/admin/login')) {
      // Optional: Redirect to login or handle session expiration
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
