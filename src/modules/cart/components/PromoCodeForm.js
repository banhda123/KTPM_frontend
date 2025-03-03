import React from 'react';
import styled from 'styled-components';
import { FaTag } from 'react-icons/fa';

const PromoContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const PromoTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: #0066cc;
  }
`;

const PromoForm = styled.form`
  display: flex;
  gap: 10px;
`;

const PromoInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const PromoButton = styled.button`
  padding: 12px 20px;
  background-color: #0066cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0052a3;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin: 10px 0 0 0;
`;

const PromoCodeForm = ({ promoCode, setPromoCode, onApply, error, loading }) => {
  return (
    <PromoContainer>
      <PromoTitle>
        <FaTag /> Promo Code
      </PromoTitle>
      
      <PromoForm onSubmit={onApply}>
        <PromoInput
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          disabled={loading}
        />
        
        <PromoButton type="submit" disabled={loading}>
          {loading ? 'Applying...' : 'Apply'}
        </PromoButton>
      </PromoForm>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </PromoContainer>
  );
};

export default PromoCodeForm;
