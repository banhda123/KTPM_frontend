import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaCreditCard, FaShippingFast } from 'react-icons/fa';

import CartController from '../../cart/controllers/CartController';
import LoadingSpinner from '../../../core/components/LoadingSpinner';
import ErrorMessage from '../../../core/components/ErrorMessage';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CheckoutHeader = styled.div`
  margin-bottom: 30px;
`;

const CheckoutTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0 0 10px 0;
`;

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  color: #0066cc;
  font-size: 0.9rem;
  padding: 0;
  cursor: pointer;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled.form`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #0066cc;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 1}, 1fr);
  gap: 15px;
  margin-bottom: 15px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid ${props => props.selected ? '#0066cc' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#f0f7ff' : '#fff'};
  transition: all 0.2s;
  
  &:hover {
    border-color: #0066cc;
  }
  
  input {
    margin-right: 10px;
  }
`;

const OrderSummary = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  align-self: flex-start;
  position: sticky;
  top: 20px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const OrderItems = styled.div`
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 5px;
`;

const OrderItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid #eee;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
`;

const ItemPrice = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: ${props => props.total ? '1.2rem' : '1rem'};
  font-weight: ${props => props.total ? '600' : '400'};
  color: ${props => props.total ? '#333' : '#666'};
  
  &:last-of-type {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #0066cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  
  &:hover {
    background-color: #0052a3;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CheckoutPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    zipCode: '',
    notes: ''
  });
  
  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const validation = await CartController.validateCartForCheckout();
        setCart(validation.cart);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load your cart. Please try again.');
        console.error('Error fetching cart for checkout:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCart();
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Calculate shipping cost
  const shippingCost = cart ? CartController.calculateShippingCost(cart.subtotal, shippingMethod) : 0;
  
  // Calculate total with shipping
  const totalWithShipping = cart ? cart.total + shippingCost : 0;
  
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically process the order
    // For now, we'll just navigate to a success page
    navigate('/checkout/success');
  };
  
  if (loading) {
    return (
      <CheckoutContainer>
        <CheckoutHeader>
          <CheckoutTitle>Checkout</CheckoutTitle>
        </CheckoutHeader>
        <LoadingSpinner />
      </CheckoutContainer>
    );
  }
  
  if (error) {
    return (
      <CheckoutContainer>
        <CheckoutHeader>
          <CheckoutTitle>Checkout</CheckoutTitle>
          <BackLink onClick={() => navigate('/cart')}>
            <FaArrowLeft /> Back to Cart
          </BackLink>
        </CheckoutHeader>
        <ErrorMessage message={error} />
      </CheckoutContainer>
    );
  }
  
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <CheckoutTitle>Checkout</CheckoutTitle>
        <BackLink onClick={() => navigate('/cart')}>
          <FaArrowLeft /> Back to Cart
        </BackLink>
      </CheckoutHeader>
      
      <CheckoutContent>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>
              <FaShippingFast /> Shipping Information
            </SectionTitle>
            
            <FormRow cols={2}>
              <FormGroup>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow cols={2}>
              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="address">Address *</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow cols={3}>
              <FormGroup>
                <Label htmlFor="city">City/Province *</Label>
                <Select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select City/Province</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="hcm">Hồ Chí Minh</option>
                  <option value="danang">Đà Nẵng</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="district">District *</Label>
                <Select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select District</option>
                  <option value="district1">District 1</option>
                  <option value="district2">District 2</option>
                  <option value="district3">District 3</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="ward">Ward *</Label>
                <Select
                  id="ward"
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Ward</option>
                  <option value="ward1">Ward 1</option>
                  <option value="ward2">Ward 2</option>
                  <option value="ward3">Ward 3</option>
                </Select>
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Input
                  as="textarea"
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  style={{ height: '100px', resize: 'vertical' }}
                />
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>
              <FaShippingFast /> Shipping Method
            </SectionTitle>
            
            <RadioGroup>
              <RadioOption selected={shippingMethod === 'standard'}>
                <input
                  type="radio"
                  id="shipping_standard"
                  name="shipping_method"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                />
                <div>
                  <strong>Standard Delivery</strong> - {formatPrice(30000)}
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                    3-5 business days
                  </div>
                </div>
              </RadioOption>
              
              <RadioOption selected={shippingMethod === 'express'}>
                <input
                  type="radio"
                  id="shipping_express"
                  name="shipping_method"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                />
                <div>
                  <strong>Express Delivery</strong> - {formatPrice(50000)}
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                    1-2 business days
                  </div>
                </div>
              </RadioOption>
              
              <RadioOption selected={shippingMethod === 'sameday'}>
                <input
                  type="radio"
                  id="shipping_sameday"
                  name="shipping_method"
                  value="sameday"
                  checked={shippingMethod === 'sameday'}
                  onChange={() => setShippingMethod('sameday')}
                />
                <div>
                  <strong>Same Day Delivery</strong> - {formatPrice(100000)}
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                    Available for select areas
                  </div>
                </div>
              </RadioOption>
            </RadioGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>
              <FaCreditCard /> Payment Method
            </SectionTitle>
            
            <RadioGroup>
              <RadioOption selected={paymentMethod === 'credit_card'}>
                <input
                  type="radio"
                  id="payment_credit_card"
                  name="payment_method"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={() => setPaymentMethod('credit_card')}
                />
                <div>
                  <strong>Credit/Debit Card</strong>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                    Pay securely with your card
                  </div>
                </div>
              </RadioOption>
              
              <RadioOption selected={paymentMethod === 'bank_transfer'}>
                <input
                  type="radio"
                  id="payment_bank_transfer"
                  name="payment_method"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                />
                <div>
                  <strong>Bank Transfer</strong>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                    Pay via bank transfer
                  </div>
                </div>
              </RadioOption>
              
              <RadioOption selected={paymentMethod === 'cod'}>
                <input
                  type="radio"
                  id="payment_cod"
                  name="payment_method"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <div>
                  <strong>Cash on Delivery</strong>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                    Pay when you receive your order
                  </div>
                </div>
              </RadioOption>
            </RadioGroup>
          </FormSection>
          
          <SubmitButton type="submit">
            Place Order
          </SubmitButton>
        </CheckoutForm>
        
        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          {cart && (
            <>
              <OrderItems>
                {cart.items.map(item => (
                  <OrderItem key={item.id}>
                    <ItemImage>
                      <img src={item.image} alt={item.name} />
                    </ItemImage>
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>
                        <span>{item.quantity} x {formatPrice(item.price)}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </ItemPrice>
                    </ItemDetails>
                  </OrderItem>
                ))}
              </OrderItems>
              
              <SummaryRow>
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </SummaryRow>
              
              {cart.discount > 0 && (
                <SummaryRow>
                  <span>Discount</span>
                  <span>-{formatPrice(cart.discount)}</span>
                </SummaryRow>
              )}
              
              <SummaryRow>
                <span>Shipping</span>
                <span>{formatPrice(shippingCost)}</span>
              </SummaryRow>
              
              <SummaryRow total>
                <span>Total</span>
                <span>{formatPrice(totalWithShipping)}</span>
              </SummaryRow>
            </>
          )}
        </OrderSummary>
      </CheckoutContent>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
