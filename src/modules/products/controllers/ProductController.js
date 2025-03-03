// ProductController.js - Handles business logic for product-related operations

import ProductModel from '../models/ProductModel';

class ProductController {
  // Get all products with optional filtering
  async getAllProducts(filters = {}) {
    try {
      return await ProductModel.getAll(filters);
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      throw new Error('Failed to fetch products. Please try again later.');
    }
  }

  // Get a single product by ID
  async getProductById(id) {
    try {
      return await ProductModel.getById(id);
    } catch (error) {
      console.error(`Error in getProductById for id ${id}:`, error);
      throw new Error('Failed to fetch product details. Please try again later.');
    }
  }

  // Get products by category
  async getProductsByCategory(category, filters = {}) {
    try {
      return await ProductModel.getByCategory(category, filters);
    } catch (error) {
      console.error(`Error in getProductsByCategory for category ${category}:`, error);
      throw new Error('Failed to fetch category products. Please try again later.');
    }
  }

  // Search products
  async searchProducts(query, filters = {}) {
    try {
      return await ProductModel.search(query, filters);
    } catch (error) {
      console.error(`Error in searchProducts for query ${query}:`, error);
      throw new Error('Failed to search products. Please try again later.');
    }
  }

  // Get featured products
  async getFeaturedProducts(limit = 8) {
    try {
      return await ProductModel.getAll({ featured: true, limit });
    } catch (error) {
      console.error('Error in getFeaturedProducts:', error);
      throw new Error('Failed to fetch featured products. Please try again later.');
    }
  }

  // Get new arrivals
  async getNewArrivals(limit = 8) {
    try {
      return await ProductModel.getAll({ new: true, limit });
    } catch (error) {
      console.error('Error in getNewArrivals:', error);
      throw new Error('Failed to fetch new arrivals. Please try again later.');
    }
  }

  // Get best selling products
  async getBestSellers(limit = 8) {
    try {
      return await ProductModel.getAll({ sort: 'sales', order: 'desc', limit });
    } catch (error) {
      console.error('Error in getBestSellers:', error);
      throw new Error('Failed to fetch best sellers. Please try again later.');
    }
  }

  // Get related products
  async getRelatedProducts(productId, limit = 4) {
    try {
      const product = await this.getProductById(productId);
      return await ProductModel.getAll({
        category: product.category,
        exclude: productId,
        limit
      });
    } catch (error) {
      console.error(`Error in getRelatedProducts for product ${productId}:`, error);
      throw new Error('Failed to fetch related products. Please try again later.');
    }
  }
}

export default new ProductController();
