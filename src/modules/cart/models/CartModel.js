// CartModel.js - Defines the data structure for cart and handles data operations

import api from '../../../services/api';

class CartModel {
  constructor(data = {}) {
    this.items = data.items || [];
    this.totalItems = data.totalItems || 0;
    this.subtotal = data.subtotal || 0;
    this.discount = data.discount || 0;
    this.total = data.total || 0;
  }

  // Calculate cart totals
  calculateTotals() {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.total = this.subtotal - this.discount;
    return this;
  }

  // Add item to cart
  addItem(product, quantity = 1) {
    const existingItemIndex = this.items.findIndex(item => item.productId === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      this.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      this.items.push({
        id: `cart-item-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        originalPrice: product.price,
        image: product.images[0],
        quantity
      });
    }
    
    return this.calculateTotals();
  }

  // Update item quantity
  updateItemQuantity(itemId, quantity) {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    
    if (itemIndex >= 0) {
      if (quantity > 0) {
        this.items[itemIndex].quantity = quantity;
      } else {
        // Remove item if quantity is 0 or negative
        this.removeItem(itemId);
      }
    }
    
    return this.calculateTotals();
  }

  // Remove item from cart
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    return this.calculateTotals();
  }

  // Clear cart
  clearCart() {
    this.items = [];
    this.totalItems = 0;
    this.subtotal = 0;
    this.discount = 0;
    this.total = 0;
    return this;
  }

  // Apply discount
  applyDiscount(amount) {
    this.discount = amount;
    this.total = this.subtotal - this.discount;
    return this;
  }

  // Static methods for API operations
  static async getCart() {
    try {
      const response = await api.get('/cart');
      return new CartModel(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }

  static async addToCart(productId, quantity) {
    try {
      const response = await api.post('/cart/items', { productId, quantity });
      return new CartModel(response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }

  static async updateCartItem(itemId, quantity) {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return new CartModel(response.data);
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

  static async removeCartItem(itemId) {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      return new CartModel(response.data);
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  }

  static async clearCart() {
    try {
      const response = await api.delete('/cart');
      return new CartModel(response.data);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  static async applyPromoCode(code) {
    try {
      const response = await api.post('/cart/promo', { code });
      return new CartModel(response.data);
    } catch (error) {
      console.error('Error applying promo code:', error);
      throw error;
    }
  }
}

export default CartModel;
