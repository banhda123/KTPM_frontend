// CartController.js - Handles business logic for cart-related operations

import CartModel from '../models/CartModel';
import ProductController from '../../products/controllers/ProductController';

class CartController {
  // Get cart data
  async getCart() {
    try {
      return await CartModel.getCart();
    } catch (error) {
      console.error('Error in getCart:', error);
      throw new Error('Failed to fetch cart. Please try again later.');
    }
  }

  // Add product to cart
  async addToCart(productId, quantity = 1) {
    try {
      // First get the product details
      const product = await ProductController.getProductById(productId);
      
      // Check if product is in stock
      if (!product.isInStock()) {
        throw new Error('This product is out of stock.');
      }
      
      // Check if requested quantity is available
      if (product.stock < quantity) {
        throw new Error(`Only ${product.stock} items available.`);
      }
      
      // Add to cart
      return await CartModel.addToCart(productId, quantity);
    } catch (error) {
      console.error(`Error in addToCart for product ${productId}:`, error);
      throw error.message ? error : new Error('Failed to add item to cart. Please try again later.');
    }
  }

  // Update cart item quantity
  async updateCartItem(itemId, quantity) {
    try {
      // Validate quantity
      if (quantity <= 0) {
        return this.removeCartItem(itemId);
      }
      
      return await CartModel.updateCartItem(itemId, quantity);
    } catch (error) {
      console.error(`Error in updateCartItem for item ${itemId}:`, error);
      throw new Error('Failed to update cart. Please try again later.');
    }
  }

  // Remove item from cart
  async removeCartItem(itemId) {
    try {
      return await CartModel.removeCartItem(itemId);
    } catch (error) {
      console.error(`Error in removeCartItem for item ${itemId}:`, error);
      throw new Error('Failed to remove item from cart. Please try again later.');
    }
  }

  // Clear cart
  async clearCart() {
    try {
      return await CartModel.clearCart();
    } catch (error) {
      console.error('Error in clearCart:', error);
      throw new Error('Failed to clear cart. Please try again later.');
    }
  }

  // Apply promo code
  async applyPromoCode(code) {
    try {
      if (!code || code.trim() === '') {
        throw new Error('Please enter a valid promo code.');
      }
      
      return await CartModel.applyPromoCode(code);
    } catch (error) {
      console.error(`Error in applyPromoCode for code ${code}:`, error);
      throw error.message ? error : new Error('Failed to apply promo code. Please try again later.');
    }
  }

  // Calculate shipping cost
  calculateShippingCost(subtotal, shippingMethod = 'standard') {
    // Free shipping for orders over 500,000 VND
    if (subtotal >= 500000) {
      return 0;
    }
    
    // Different shipping costs based on method
    switch (shippingMethod) {
      case 'express':
        return 50000;
      case 'sameday':
        return 100000;
      case 'standard':
      default:
        return 30000;
    }
  }

  // Validate cart before checkout
  async validateCartForCheckout() {
    try {
      const cart = await this.getCart();
      
      // Check if cart is empty
      if (cart.items.length === 0) {
        throw new Error('Your cart is empty. Please add items before checkout.');
      }
      
      // Check if all items are still in stock
      const stockValidation = await Promise.all(
        cart.items.map(async (item) => {
          const product = await ProductController.getProductById(item.productId);
          return {
            itemId: item.id,
            productId: item.productId,
            name: item.name,
            requestedQuantity: item.quantity,
            availableQuantity: product.stock,
            isAvailable: product.stock >= item.quantity
          };
        })
      );
      
      const unavailableItems = stockValidation.filter(item => !item.isAvailable);
      
      if (unavailableItems.length > 0) {
        throw {
          message: 'Some items in your cart are no longer available in the requested quantity.',
          unavailableItems
        };
      }
      
      return { valid: true, cart };
    } catch (error) {
      console.error('Error in validateCartForCheckout:', error);
      throw error;
    }
  }
}

export default new CartController();
