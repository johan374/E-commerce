import axios from 'axios';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Your Django backend URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers
  },
});

// Optional: Add request/response interceptors for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors consistently
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);



export default api;