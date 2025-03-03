import React from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

const SummaryContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: ${props => props.total ? '1.2rem' : '1rem'};
  font-weight: ${props => props.total ? '600' : '400'};
  color: ${props => props.total ? '#333' : '#666'};
  
  &:last-of-type {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
`;

const CheckoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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
  
  svg {
    margin-left: 8px;
  }
`;

const DiscountAmount = styled.span`
  color: #e74c3c;
`;

const CartSummary = ({ subtotal, discount, total, onCheckout }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <SummaryContainer>
      <SummaryTitle>Order Summary</SummaryTitle>
      
      <SummaryRow>
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </SummaryRow>
      
      {discount > 0 && (
        <SummaryRow>
          <span>Discount</span>
          <DiscountAmount>-{formatPrice(discount)}</DiscountAmount>
        </SummaryRow>
      )}
      
      <SummaryRow total>
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </SummaryRow>
      
      <CheckoutButton onClick={onCheckout}>
        Proceed to Checkout <FaArrowRight />
      </CheckoutButton>
    </SummaryContainer>
  );
};

export default CartSummary;
