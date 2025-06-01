import axios from 'axios';
import { setupInterceptors } from './interceptors';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup interceptors
setupInterceptors(apiClient);

// API functions
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    
    // Store token if needed (in real app, you'd use secure storage)
    if (response.data.token) {
      // In a real application, store this securely
      console.log('Login token received:', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error);
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
};

// Additional API functions can be added here
export const refreshToken = async (refreshToken) => {
  try {
    const response = await apiClient.post('/auth/refresh', {
      refreshToken: refreshToken,
      expiresInMins: 30
    });
    return response.data;
  } catch (error) {
    throw new Error('Token refresh failed');
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await apiClient.get('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};

export default apiClient;