// UserModel.js - Defines the data structure for user and handles user data operations

import { api } from '../../../services/api';

class UserModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.avatar = data.avatar || '';
    this.role = data.role || 'customer';
    this.addresses = data.addresses || [];
    this.defaultAddressId = data.defaultAddressId || null;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
  }

  // Get full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  // Get default address
  getDefaultAddress() {
    if (!this.defaultAddressId || !this.addresses.length) return null;
    return this.addresses.find(address => address.id === this.defaultAddressId) || this.addresses[0];
  }

  // Get formatted address
  getFormattedAddress(addressId = null) {
    const address = addressId 
      ? this.addresses.find(addr => addr.id === addressId) 
      : this.getDefaultAddress();
    
    if (!address) return '';
    
    return [
      address.street,
      address.ward,
      address.district,
      address.city,
      address.country
    ].filter(Boolean).join(', ');
  }

  // Check if user is admin
  isAdmin() {
    return this.role === 'admin';
  }

  // Static methods for API operations
  static async getCurrentUser() {
    try {
      const response = await api.get('/users/me');
      return new UserModel(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        api.setAuthHeader(response.data.token);
      }
      
      return new UserModel(response.data.user);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  static async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Store token in localStorage if provided
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        api.setAuthHeader(response.data.token);
      }
      
      return new UserModel(response.data.user);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('auth_token');
    api.removeAuthHeader();
  }

  static async updateProfile(userData) {
    try {
      const response = await api.put('/users/me', userData);
      return new UserModel(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  static async addAddress(addressData) {
    try {
      const response = await api.post('/users/me/addresses', addressData);
      return response.data;
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  }

  static async updateAddress(addressId, addressData) {
    try {
      const response = await api.put(`/users/me/addresses/${addressId}`, addressData);
      return response.data;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }

  static async deleteAddress(addressId) {
    try {
      await api.delete(`/users/me/addresses/${addressId}`);
      return true;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  }

  static async setDefaultAddress(addressId) {
    try {
      const response = await api.put(`/users/me/addresses/${addressId}/default`);
      return response.data;
    } catch (error) {
      console.error('Error setting default address:', error);
      throw error;
    }
  }

  static async changePassword(currentPassword, newPassword) {
    try {
      await api.put('/users/me/password', { currentPassword, newPassword });
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  static async requestPasswordReset(email) {
    try {
      await api.post('/auth/forgot-password', { email });
      return true;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  }

  static async resetPassword(token, newPassword) {
    try {
      await api.post('/auth/reset-password', { token, newPassword });
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
}

export default UserModel;
