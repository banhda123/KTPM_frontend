import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

import CartController from '../controllers/CartController';
import LoadingSpinner from '../../../core/components/LoadingSpinner';
import ErrorMessage from '../../../core/components/ErrorMessage';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import PromoCodeForm from '../components/PromoCodeForm';

const CartPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 40px 20px;
  
  svg {
    font-size: 4rem;
    color: #ddd;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #555;
  }
  
  p {
    color: #777;
    margin-bottom: 25px;
  }
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  background-color: ${props => props.primary ? '#0066cc' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#0066cc'};
  border: 1px solid #0066cc;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.primary ? '#0052a3' : '#f0f7ff'};
  }
  
  svg {
    margin-right: 8px;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  background-color: ${props => props.primary ? '#0066cc' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#0066cc'};
  border: 1px solid #0066cc;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.primary ? '#0052a3' : '#f0f7ff'};
  }
  
  &:disabled {
    background-color: #cccccc;
    color: #666;
    border-color: #cccccc;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const cartData = await CartController.getCart();
        setCart(cartData);
        setError(null);
      } catch (err) {
        setError('Failed to load your cart. Please try again.');
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Handle quantity update
  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      const updatedCart = await CartController.updateCartItem(itemId, quantity);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to update item quantity. Please try again.');
      console.error('Error updating quantity:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle item removal
  const handleRemoveItem = async (itemId) => {
    try {
      setLoading(true);
      const updatedCart = await CartController.removeCartItem(itemId);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to remove item from cart. Please try again.');
      console.error('Error removing item:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle cart clearing
  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        setLoading(true);
        const emptyCart = await CartController.clearCart();
        setCart(emptyCart);
      } catch (err) {
        setError('Failed to clear your cart. Please try again.');
        console.error('Error clearing cart:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle promo code application
  const handleApplyPromoCode = async (e) => {
    e.preventDefault();
    
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    try {
      setPromoLoading(true);
      setPromoError(null);
      const updatedCart = await CartController.applyPromoCode(promoCode);
      setCart(updatedCart);
      setPromoCode('');
    } catch (err) {
      setPromoError(err.message || 'Invalid promo code');
      console.error('Error applying promo code:', err);
    } finally {
      setPromoLoading(false);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const validation = await CartController.validateCartForCheckout();
      
      if (validation.valid) {
        navigate('/checkout');
      }
    } catch (err) {
      if (err.unavailableItems) {
        setError('Some items in your cart are no longer available in the requested quantity.');
      } else {
        setError(err.message || 'Failed to proceed to checkout. Please try again.');
      }
      console.error('Error during checkout validation:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !cart) {
    return (
      <CartPageContainer>
        <CartHeader>
          <CartTitle>Your Cart</CartTitle>
        </CartHeader>
        <LoadingSpinner />
      </CartPageContainer>
    );
  }

  if (error && !cart) {
    return (
      <CartPageContainer>
        <CartHeader>
          <CartTitle>Your Cart</CartTitle>
        </CartHeader>
        <ErrorMessage message={error} />
        <ActionButton to="/products">
          <FaArrowLeft /> Continue Shopping
        </ActionButton>
      </CartPageContainer>
    );
  }

  return (
    <CartPageContainer>
      <CartHeader>
        <CartTitle>Your Cart</CartTitle>
        <ActionButton to="/products">
          <FaArrowLeft /> Continue Shopping
        </ActionButton>
      </CartHeader>

      {error && <ErrorMessage message={error} />}

      {cart && cart.items.length === 0 ? (
        <EmptyCart>
          <FaShoppingCart />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <ActionButton to="/products" primary>
            Start Shopping
          </ActionButton>
        </EmptyCart>
      ) : (
        <CartContent>
          <CartItems>
            {loading && <LoadingSpinner overlay />}
            
            {cart && cart.items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
            
            {cart && cart.items.length > 0 && (
              <Button onClick={handleClearCart} style={{ marginTop: '20px' }}>
                <FaTrash /> Clear Cart
              </Button>
            )}
          </CartItems>
          
          {cart && cart.items.length > 0 && (
            <div>
              <PromoCodeForm
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                onApply={handleApplyPromoCode}
                error={promoError}
                loading={promoLoading}
              />
              
              <CartSummary
                subtotal={cart.subtotal}
                discount={cart.discount}
                total={cart.total}
                onCheckout={handleCheckout}
              />
            </div>
          )}
        </CartContent>
      )}
    </CartPageContainer>
  );
};

export default CartPage;
