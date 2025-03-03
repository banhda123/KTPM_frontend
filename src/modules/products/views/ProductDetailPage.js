import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaCheck } from 'react-icons/fa';
import ProductController from '../controllers/ProductController';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../../../core/components/LoadingSpinner';
import ErrorMessage from '../../../core/components/ErrorMessage';
import Tabs from '../components/Tabs';

const ProductContainer = styled.div`
  padding: 20px 0;
`;

const Breadcrumbs = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const BreadcrumbItem = styled.span`
  color: ${props => props.active ? '#333' : '#666'};
  
  &:not(:last-child)::after {
    content: '>';
    margin: 0 8px;
    color: #666;
  }
  
  a {
    color: #666;
    text-decoration: none;
    
    &:hover {
      color: #0066cc;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.div`
  height: 400px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 5px;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#0066cc' : 'transparent'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Stars = styled.div`
  display: flex;
  color: #ffc107;
  margin-right: 5px;
`;

const ReviewCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const StockStatus = styled.div`
  color: ${props => props.inStock ? '#28a745' : '#dc3545'};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
`;

const PriceContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const CurrentPrice = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff6600;
  margin-right: 15px;
`;

const OriginalPrice = styled.span`
  font-size: 1.2rem;
  color: #999;
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  display: inline-block;
  padding: 3px 8px;
  background-color: #ff6600;
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 10px;
`;

const Description = styled.div`
  margin-bottom: 20px;
  line-height: 1.6;
  color: #555;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const QuantityLabel = styled.span`
  margin-right: 15px;
  font-weight: 500;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border: none;
  color: #333;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align: center;
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0055aa;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const WishlistButton = styled.button`
  padding: 12px;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e0e0e0;
    color: #ff6600;
  }
`;

const ShareButton = styled(WishlistButton)``;

const RelatedProductsSection = styled.div`
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #0066cc;
  }
`;

const ProductGrid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const productData = await ProductController.getProductById(id);
        setProduct(productData);
        
        // Fetch related products
        const related = await ProductController.getRelatedProducts(id);
        setRelatedProducts(related);
        
        setError(null);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(Math.min(value, product.stock));
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    // This would dispatch to a cart context/redux store in a real app
    console.log(`Added ${quantity} of ${product.name} to cart`);
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!product) {
    return <ErrorMessage message="Không tìm thấy sản phẩm" />;
  }
  
  // Mock product data for display
  const mockProduct = {
    id: product.id || '1',
    name: product.name || 'Bút Thiên Long FlexOffice FO-03',
    price: product.price || 22000,
    salePrice: product.salePrice || null,
    category: product.category || 'Bút viết',
    description: product.description || 'Bút bi cao cấp với thiết kế hiện đại, mực viết trơn tru và bền màu. Sản phẩm được sản xuất theo công nghệ tiên tiến, đảm bảo chất lượng và độ bền cao.',
    images: product.images || [
      'https://via.placeholder.com/600x400?text=Product-1',
      'https://via.placeholder.com/600x400?text=Product-2',
      'https://via.placeholder.com/600x400?text=Product-3'
    ],
    stock: product.stock || 15,
    rating: product.rating || 4.5,
    reviewCount: product.reviewCount || 120,
    specifications: product.specifications || {
      'Thương hiệu': 'Thiên Long',
      'Xuất xứ': 'Việt Nam',
      'Chất liệu': 'Nhựa cao cấp',
      'Màu mực': 'Xanh/Đen/Đỏ',
      'Độ mịn': '0.5mm'
    },
    reviews: product.reviews || []
  };
  
  const {
    name,
    price,
    salePrice,
    category,
    description,
    images,
    stock,
    rating,
    reviewCount,
    specifications
  } = mockProduct;
  
  const inStock = stock > 0;
  const discountPercentage = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;
  
  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };
  
  const tabContent = {
    description: (
      <div>
        <p>{description}</p>
      </div>
    ),
    specifications: (
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {Object.entries(specifications).map(([key, value]) => (
              <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px', fontWeight: '500', width: '30%' }}>{key}</td>
                <td style={{ padding: '10px' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    reviews: (
      <div>
        {mockProduct.reviews.length > 0 ? (
          mockProduct.reviews.map((review, index) => (
            <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <strong>{review.user}</strong>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < review.rating ? '#ffc107' : '#e4e5e9'} />
                ))}
              </div>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        )}
      </div>
    )
  };
  
  return (
    <ProductContainer>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to="/">Trang chủ</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/products">Sản phẩm</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={`/products?category=${category}`}>{category}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{name}</BreadcrumbItem>
      </Breadcrumbs>
      
      <ProductGrid>
        <ImageGallery>
          <MainImage>
            <img src={images[selectedImage]} alt={name} />
          </MainImage>
          <ThumbnailsContainer>
            {images.map((image, index) => (
              <Thumbnail 
                key={index} 
                active={index === selectedImage}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${name} - ${index + 1}`} />
              </Thumbnail>
            ))}
          </ThumbnailsContainer>
        </ImageGallery>
        
        <ProductInfo>
          <ProductTitle>{name}</ProductTitle>
          
          <ProductMeta>
            <Rating>
              <Stars>
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} color={index < Math.floor(rating) ? '#ffc107' : '#e4e5e9'} />
                ))}
              </Stars>
              <ReviewCount>({reviewCount} đánh giá)</ReviewCount>
            </Rating>
            
            <StockStatus inStock={inStock}>
              {inStock ? (
                <>
                  <FaCheck /> Còn hàng
                </>
              ) : (
                'Hết hàng'
              )}
            </StockStatus>
          </ProductMeta>
          
          <PriceContainer>
            <CurrentPrice>{formatPrice(salePrice || price)}</CurrentPrice>
            {salePrice && (
              <>
                <OriginalPrice>{formatPrice(price)}</OriginalPrice>
                <DiscountBadge>-{discountPercentage}%</DiscountBadge>
              </>
            )}
          </PriceContainer>
          
          <Description>
            <p>{description}</p>
          </Description>
          
          {inStock && (
            <>
              <QuantitySelector>
                <QuantityLabel>Số lượng:</QuantityLabel>
                <QuantityControls>
                  <QuantityButton onClick={decreaseQuantity} disabled={quantity <= 1}>-</QuantityButton>
                  <QuantityInput 
                    type="number" 
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={stock}
                  />
                  <QuantityButton onClick={increaseQuantity} disabled={quantity >= stock}>+</QuantityButton>
                </QuantityControls>
              </QuantitySelector>
              
              <ActionButtons>
                <AddToCartButton onClick={handleAddToCart}>
                  <FaShoppingCart /> Thêm vào giỏ hàng
                </AddToCartButton>
                <WishlistButton title="Thêm vào yêu thích">
                  <FaHeart />
                </WishlistButton>
                <ShareButton title="Chia sẻ">
                  <FaShare />
                </ShareButton>
              </ActionButtons>
            </>
          )}
        </ProductInfo>
      </ProductGrid>
      
      <Tabs 
        tabs={[
          { id: 'description', label: 'Mô tả sản phẩm' },
          { id: 'specifications', label: 'Thông số kỹ thuật' },
          { id: 'reviews', label: `Đánh giá (${reviewCount})` }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        content={tabContent[activeTab]}
      />
      
      <RelatedProductsSection>
        <SectionTitle>Sản phẩm liên quan</SectionTitle>
        <ProductGrid4>
          {relatedProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid4>
      </RelatedProductsSection>
    </ProductContainer>
  );
};

export default ProductDetailPage;
