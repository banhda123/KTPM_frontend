import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductController from '../../products/controllers/ProductController';
import ProductCard from '../../products/components/ProductCard';
import Banner from '../components/Banner';
import CategorySection from '../components/CategorySection';
import PromotionBanner from '../components/PromotionBanner';
import LoadingSpinner from '../../../core/components/LoadingSpinner';
import ErrorMessage from '../../../core/components/ErrorMessage';

const HomeContainer = styled.div`
  padding-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 40px 0 20px;
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ViewAllLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  color: #0066cc;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHomePageData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be parallel requests
        const featured = await ProductController.getFeaturedProducts();
        const newProducts = await ProductController.getNewArrivals();
        const popular = await ProductController.getBestSellers();
        
        setFeaturedProducts(featured);
        setNewArrivals(newProducts);
        setBestSellers(popular);
        setError(null);
      } catch (err) {
        setError('Failed to load homepage data. Please try again later.');
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomePageData();
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <HomeContainer>
      <Banner />
      
      <CategorySection />
      
      <SectionTitle>Sản phẩm nổi bật</SectionTitle>
      <ProductGrid>
        {featuredProducts.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
      <ViewAllLink href="/products?featured=true">Xem tất cả sản phẩm nổi bật</ViewAllLink>
      
      <PromotionBanner 
        title="Giải pháp văn phòng phẩm doanh nghiệp" 
        description="Cung cấp đầy đủ văn phòng phẩm cho doanh nghiệp của bạn"
        buttonText="Đặt hàng ngay"
        buttonLink="/products/office"
        imageUrl="https://via.placeholder.com/1200x300"
      />
      
      <SectionTitle>Sản phẩm mới</SectionTitle>
      <ProductGrid>
        {newArrivals.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
      <ViewAllLink href="/products?new=true">Xem tất cả sản phẩm mới</ViewAllLink>
      
      <SectionTitle>Sản phẩm bán chạy</SectionTitle>
      <ProductGrid>
        {bestSellers.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
      <ViewAllLink href="/products?sort=popular">Xem tất cả sản phẩm bán chạy</ViewAllLink>
      
      <PromotionBanner 
        title="Chơi game dễ dàng, trúng quà liền tay" 
        description="Cơ hội nhận ngay ưu đãi lên đến 100% giá trị đơn hàng"
        buttonText="Xem ngay"
        buttonLink="/promotions"
        imageUrl="https://via.placeholder.com/1200x300"
        reverse={true}
      />
    </HomeContainer>
  );
};

export default HomePage;
