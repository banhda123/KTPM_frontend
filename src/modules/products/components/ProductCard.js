import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:hover .product-actions {
    opacity: 1;
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.5s;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff6600;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8rem;
`;

const NewBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #0066cc;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8rem;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductCategory = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 5px;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  margin-bottom: 10px;
  font-weight: 500;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  a {
    color: #333;
    text-decoration: none;
    
    &:hover {
      color: #0066cc;
    }
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CurrentPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff6600;
`;

const OriginalPrice = styled.span`
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 8px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Stars = styled.div`
  display: flex;
  color: #ffc107;
  margin-right: 5px;
`;

const RatingCount = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const ProductActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 0;
  opacity: 0;
  transition: opacity 0.3s;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
  
  &:hover {
    color: #0066cc;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const StockStatus = styled.div`
  font-size: 0.8rem;
  color: ${props => props.inStock ? '#28a745' : '#dc3545'};
  margin-top: 5px;
`;

const ProductCard = ({ product }) => {
  // In a real app, product would be passed as a prop
  // For this example, we'll use a mock product
  const mockProduct = {
    id: product?.id || '1',
    name: product?.name || 'Bút Thiên Long Flexoffice FO-03',
    price: product?.price || 22000,
    salePrice: product?.salePrice || null,
    category: product?.category || 'Bút viết',
    image: product?.image || 'https://via.placeholder.com/300',
    rating: product?.rating || 4.5,
    reviewCount: product?.reviewCount || 120,
    isNew: product?.isNew || true,
    stock: product?.stock || 15
  };
  
  const {
    id,
    name,
    price,
    salePrice,
    category,
    image,
    rating,
    reviewCount,
    isNew,
    stock
  } = mockProduct;
  
  const inStock = stock > 0;
  const discountPercentage = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;
  
  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };
  
  return (
    <Card>
      <ProductImage>
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} />
        </Link>
        {isNew && <NewBadge>Mới</NewBadge>}
        {salePrice && <DiscountBadge>-{discountPercentage}%</DiscountBadge>}
        <ProductActions className="product-actions">
          <ActionButton title="Thêm vào giỏ hàng">
            <FaShoppingCart />
          </ActionButton>
          <ActionButton title="Thêm vào yêu thích">
            <FaHeart />
          </ActionButton>
          <ActionButton title="Xem nhanh">
            <FaEye />
          </ActionButton>
        </ProductActions>
      </ProductImage>
      
      <ProductInfo>
        <ProductCategory>{category}</ProductCategory>
        <ProductName>
          <Link to={`/products/${id}`}>{name}</Link>
        </ProductName>
        
        <Rating>
          <Stars>
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} color={index < Math.floor(rating) ? '#ffc107' : '#e4e5e9'} />
            ))}
          </Stars>
          <RatingCount>({reviewCount})</RatingCount>
        </Rating>
        
        <PriceContainer>
          <CurrentPrice>{formatPrice(salePrice || price)}</CurrentPrice>
          {salePrice && <OriginalPrice>{formatPrice(price)}</OriginalPrice>}
        </PriceContainer>
        
        <StockStatus inStock={inStock}>
          {inStock ? 'Còn hàng' : 'Hết hàng'}
        </StockStatus>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;
