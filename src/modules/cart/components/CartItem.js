import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const CartItemContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 80px 1fr;
    gap: 15px;
  }
`;

const ProductImage = styled.div`
  width: 100px;
  height: 100px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid #eee;
  }
  
  @media (max-width: 576px) {
    width: 80px;
    height: 80px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled(Link)`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  margin-bottom: 5px;
  
  &:hover {
    color: #0066cc;
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CurrentPrice = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: #0066cc;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
  margin-left: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 576px) {
    margin-top: 10px;
  }
`;

const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  border-radius: ${props => props.left ? '4px 0 0 4px' : '0 4px 4px 0'};
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 32px;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 0.9rem;
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  
  @media (max-width: 576px) {
    grid-column: span 2;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
  }
`;

const ItemTotal = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #333;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: #e74c3c;
  }
  
  svg {
    margin-right: 5px;
  }
`;

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      onUpdateQuantity(item.id, value);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <CartItemContainer>
      <ProductImage>
        <img src={item.image} alt={item.name} />
      </ProductImage>
      
      <ProductInfo>
        <div>
          <ProductName to={`/products/${item.productId}`}>
            {item.name}
          </ProductName>
          
          <ProductPrice>
            <CurrentPrice>{formatPrice(item.price)}</CurrentPrice>
            {item.price < item.originalPrice && (
              <OriginalPrice>{formatPrice(item.originalPrice)}</OriginalPrice>
            )}
          </ProductPrice>
        </div>
        
        <QuantityControl>
          <QuantityButton 
            left 
            onClick={handleDecrement} 
            disabled={item.quantity <= 1}
          >
            <FaMinus size={12} />
          </QuantityButton>
          
          <QuantityInput
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
          
          <QuantityButton onClick={handleIncrement}>
            <FaPlus size={12} />
          </QuantityButton>
        </QuantityControl>
      </ProductInfo>
      
      <ItemActions>
        <ItemTotal>
          {formatPrice(item.price * item.quantity)}
        </ItemTotal>
        
        <RemoveButton onClick={() => onRemoveItem(item.id)}>
          <FaTrash size={14} /> Remove
        </RemoveButton>
      </ItemActions>
    </CartItemContainer>
  );
};

export default CartItem;
