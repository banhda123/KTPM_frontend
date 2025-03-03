import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BannerContainer = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const SlideContainer = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
  transform: translateX(-${props => props.activeIndex * 100}%);
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  position: relative;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const SlideContent = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  max-width: 500px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const SlideTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: 700;
`;

const SlideDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 25px;
  line-height: 1.5;
`;

const SlideButton = styled(Link)`
  display: inline-block;
  padding: 12px 25px;
  background-color: #ff6600;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e55500;
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 2;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: ${props => props.direction === 'left' ? 'rotate(-45deg)' : 'rotate(135deg)'};
  }
`;

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Mock banner data
  const banners = [
    {
      id: 1,
      title: 'Giải pháp văn phòng phẩm toàn diện',
      description: 'Cung cấp đầy đủ các sản phẩm văn phòng phẩm chất lượng cao với giá cả hợp lý',
      image: 'https://via.placeholder.com/1200x400/0066cc/ffffff?text=Banner+1',
      link: '/products'
    },
    {
      id: 2,
      title: 'Ưu đãi lớn - Giảm đến 50%',
      description: 'Khuyến mãi đặc biệt cho tất cả sản phẩm mới. Nhanh tay mua ngay!',
      image: 'https://via.placeholder.com/1200x400/ff6600/ffffff?text=Banner+2',
      link: '/products?sale=true'
    },
    {
      id: 3,
      title: 'Bộ sưu tập bút cao cấp',
      description: 'Khám phá bộ sưu tập bút cao cấp mới nhất từ các thương hiệu nổi tiếng',
      image: 'https://via.placeholder.com/1200x400/009933/ffffff?text=Banner+3',
      link: '/products/premium'
    }
  ];
  
  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);
  
  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + banners.length) % banners.length);
  };
  
  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % banners.length);
  };
  
  return (
    <BannerContainer>
      <SlideContainer activeIndex={activeIndex}>
        {banners.map(banner => (
          <Slide key={banner.id} image={banner.image}>
            <SlideContent>
              <SlideTitle>{banner.title}</SlideTitle>
              <SlideDescription>{banner.description}</SlideDescription>
              <SlideButton to={banner.link}>Xem ngay</SlideButton>
            </SlideContent>
          </Slide>
        ))}
      </SlideContainer>
      
      <ArrowButton direction="left" onClick={handlePrev} />
      <ArrowButton direction="right" onClick={handleNext} />
      
      <Indicators>
        {banners.map((_, index) => (
          <Indicator 
            key={index} 
            active={index === activeIndex} 
            onClick={() => setActiveIndex(index)} 
          />
        ))}
      </Indicators>
    </BannerContainer>
  );
};

export default Banner;
