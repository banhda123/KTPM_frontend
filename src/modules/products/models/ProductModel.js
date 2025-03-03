// ProductModel.js - Defines the data structure for products and handles data operations

import { api } from '../../../services/api';

class ProductModel {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.price = data.price || 0;
    this.salePrice = data.salePrice || null;
    this.description = data.description || '';
    this.category = data.category || '';
    this.images = data.images || [];
    this.stock = data.stock || 0;
    this.rating = data.rating || 0;
    this.reviews = data.reviews || [];
    this.featured = data.featured || false;
    this.new = data.new || false;
    this.specifications = data.specifications || {};
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Calculate discount percentage
  getDiscountPercentage() {
    if (!this.salePrice || this.price <= 0) return 0;
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
  }

  // Check if product is on sale
  isOnSale() {
    return this.salePrice !== null && this.salePrice < this.price;
  }

  // Check if product is in stock
  isInStock() {
    return this.stock > 0;
  }

  // Format price with currency
  formatPrice(price = this.price) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  // Static methods for API operations
  static async getAll(params = {}) {
    try {
      const response = await api.get('/products', { params });
      return response.data.map(product => new ProductModel(product));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return new ProductModel(response.data);
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  }

  static async getByCategory(category, params = {}) {
    try {
      const response = await api.get(`/products`, {
        params: { category, ...params }
      });
      return response.data.map(product => new ProductModel(product));
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      throw error;
    }
  }

  static async search(query, params = {}) {
    try {
      const response = await api.get(`/products/search`, {
        params: { query, ...params }
      });
      return response.data.map(product => new ProductModel(product));
    } catch (error) {
      console.error(`Error searching products with query ${query}:`, error);
      throw error;
    }
  }
}

export default ProductModel;
