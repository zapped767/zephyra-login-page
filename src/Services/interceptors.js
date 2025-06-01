// Interceptors for API requests and responses
export const setupInterceptors = (apiClient) => {
  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      // Log all outgoing requests
      console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
      console.log('Request data:', config.data);
      
      // Add timestamp to requests
      config.metadata = { startTime: new Date() };
      
      // Add auth token if available (in real app)
      const token = localStorage.getItem('authToken');
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add request ID for tracking
      config.headers['X-Request-ID'] = generateRequestId();
      
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => {
      // Log successful responses
      const duration = new Date() - response.config.metadata.startTime;
      console.log(`Response received in ${duration}ms:`, response.status);
      console.log('Response data:', response.data);
      
      // Add custom response metadata
      response.metadata = {
        duration,
        timestamp: new Date().toISOString(),
        requestId: response.config.headers['X-Request-ID']
      };
      
      return response;
    },
    (error) => {
      // Handle response errors
      const duration = error.config ? 
        new Date() - error.config.metadata.startTime : 0;
      
      console.error(`Request failed after ${duration}ms:`, error.message);
      
      if (error.response) {
        // Server responded with error status
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        
        // Handle specific error cases
        switch (error.response.status) {
          case 401:
            console.warn('Unauthorized access - token may be expired');
            // In real app, redirect to login or refresh token
            break;
          case 403:
            console.warn('Forbidden access');
            break;
          case 404:
            console.warn('Resource not found');
            break;
          case 500:
            console.error('Server error');
            break;
          default:
            console.error('Unhandled error status:', error.response.status);
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
      } else {
        // Something else happened
        console.error('Request setup error:', error.message);
      }
      
      // Add error metadata
      error.metadata = {
        duration,
        timestamp: new Date().toISOString(),
        requestId: error.config?.headers['X-Request-ID']
      };
      
      return Promise.reject(error);
    }
  );
};

// Helper function to generate unique request IDs
const generateRequestId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Additional interceptor utilities
export const addAuthInterceptor = (apiClient, getToken) => {
  apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export const addRetryInterceptor = (apiClient, maxRetries = 3) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      
      if (!config || !config.retry) {
        config.retry = 0;
      }
      
      if (config.retry < maxRetries && error.response?.status >= 500) {
        config.retry++;
        console.log(`Retrying request (${config.retry}/${maxRetries})`);
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, config.retry) * 1000)
        );
        
        return apiClient.request(config);
      }
      
      return Promise.reject(error);
    }
  );
};