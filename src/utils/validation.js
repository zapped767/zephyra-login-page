// Form validation utilities
export const validateForm = (formData) => {
  const errors = {};
  
  // First name validation
  if (!formData.firstName || formData.firstName.trim() === '') {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
    errors.firstName = 'First name can only contain letters';
  }
  
  // Last name validation
  if (!formData.lastName || formData.lastName.trim() === '') {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
    errors.lastName = 'Last name can only contain letters';
  }
  
  // Email validation
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  if (!formData.password || formData.password.trim() === '') {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (!isStrongPassword(formData.password)) {
    errors.password = 'Password must contain at least one letter and one number';
  }
  
  return errors;
};

// Email validation helper
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
export const isStrongPassword = (password) => {
  // At least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
};

// Individual field validators
export const validateField = (name, value) => {
  switch (name) {
    case 'firstName':
    case 'lastName':
      if (!value || value.trim() === '') {
        return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
      }
      if (value.length < 2) {
        return `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
      }
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        return `${name === 'firstName' ? 'First' : 'Last'} name can only contain letters`;
      }
      return '';
      
    case 'email':
      if (!value || value.trim() === '') {
        return 'Email is required';
      }
      if (!isValidEmail(value)) {
        return 'Please enter a valid email address';
      }
      return '';
      
    case 'password':
      if (!value || value.trim() === '') {
        return 'Password is required';
      }
      if (value.length < 6) {
        return 'Password must be at least 6 characters';
      }
      if (!isStrongPassword(value)) {
        return 'Password must contain at least one letter and one number';
      }
      return '';
      
    default:
      return '';
  }
};

// Sanitize input data
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

// Form data sanitizer
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  Object.keys(formData).forEach(key => {
    sanitized[key] = sanitizeInput(formData[key]);
  });
  
  return sanitized;
};