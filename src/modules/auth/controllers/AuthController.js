// AuthController.js - Handles business logic for authentication-related operations

import UserModel from '../models/UserModel';

class AuthController {
  // Check if user is logged in
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }
  
  // Login user
  async login(email, password) {
    try {
      // Validate inputs
      if (!email || !email.trim()) {
        throw new Error('Email is required');
      }
      
      if (!password || !password.trim()) {
        throw new Error('Password is required');
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Attempt login
      return await UserModel.login(email, password);
    } catch (error) {
      console.error('Error in login:', error);
      
      // Handle specific API errors
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Invalid email or password');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      
      // Throw original error if it has a message, otherwise generic error
      throw error.message ? error : new Error('Login failed. Please try again later.');
    }
  }
  
  // Register new user
  async register(userData) {
    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      for (const field of requiredFields) {
        if (!userData[field] || !userData[field].trim()) {
          throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        }
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Validate password strength
      if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Check if passwords match
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...dataToSend } = userData;
      
      // Attempt registration
      return await UserModel.register(dataToSend);
    } catch (error) {
      console.error('Error in register:', error);
      
      // Handle specific API errors
      if (error.response) {
        if (error.response.status === 409) {
          throw new Error('Email already in use');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      
      // Throw original error if it has a message, otherwise generic error
      throw error.message ? error : new Error('Registration failed. Please try again later.');
    }
  }
  
  // Logout user
  logout() {
    UserModel.logout();
  }
  
  // Get current user profile
  async getCurrentUser() {
    try {
      if (!this.isAuthenticated()) {
        return null;
      }
      
      return await UserModel.getCurrentUser();
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      
      // If unauthorized, clear token
      if (error.response && error.response.status === 401) {
        this.logout();
      }
      
      return null;
    }
  }
  
  // Update user profile
  async updateProfile(userData) {
    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email'];
      for (const field of requiredFields) {
        if (!userData[field] || !userData[field].trim()) {
          throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        }
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Validate phone format if provided
      if (userData.phone && !/^[0-9]{10,11}$/.test(userData.phone)) {
        throw new Error('Please enter a valid phone number');
      }
      
      return await UserModel.updateProfile(userData);
    } catch (error) {
      console.error('Error in updateProfile:', error);
      
      // Handle specific API errors
      if (error.response) {
        if (error.response.status === 409) {
          throw new Error('Email already in use');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      
      // Throw original error if it has a message, otherwise generic error
      throw error.message ? error : new Error('Profile update failed. Please try again later.');
    }
  }
  
  // Change password
  async changePassword(currentPassword, newPassword, confirmPassword) {
    try {
      // Validate inputs
      if (!currentPassword || !currentPassword.trim()) {
        throw new Error('Current password is required');
      }
      
      if (!newPassword || !newPassword.trim()) {
        throw new Error('New password is required');
      }
      
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Validate password strength
      if (newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      return await UserModel.changePassword(currentPassword, newPassword);
    } catch (error) {
      console.error('Error in changePassword:', error);
      
      // Handle specific API errors
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Current password is incorrect');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      
      // Throw original error if it has a message, otherwise generic error
      throw error.message ? error : new Error('Password change failed. Please try again later.');
    }
  }
  
  // Request password reset
  async requestPasswordReset(email) {
    try {
      // Validate email
      if (!email || !email.trim()) {
        throw new Error('Email is required');
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      return await UserModel.requestPasswordReset(email);
    } catch (error) {
      console.error('Error in requestPasswordReset:', error);
      
      // Handle specific API errors
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      
      // Throw original error if it has a message, otherwise generic error
      throw error.message ? error : new Error('Password reset request failed. Please try again later.');
    }
  }
  
  // Reset password
  async resetPassword(token, newPassword, confirmPassword) {
    try {
      // Validate inputs
      if (!token || !token.trim()) {
        throw new Error('Reset token is required');
      }
      
      if (!newPassword || !newPassword.trim()) {
        throw new Error('New password is required');
      }
      
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Validate password strength
      if (newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      return await UserModel.resetPassword(token, newPassword);
    } catch (error) {
      console.error('Error in resetPassword:', error);
      
      // Handle specific API errors
      if (error.response) {
        if (error.response.status === 400) {
          throw new Error('Invalid or expired reset token');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      
      // Throw original error if it has a message, otherwise generic error
      throw error.message ? error : new Error('Password reset failed. Please try again later.');
    }
  }
}

export default new AuthController();
