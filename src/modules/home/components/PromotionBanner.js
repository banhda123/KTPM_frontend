import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BannerContainer = styled.div`
  margin: 40px 0;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  height: 300px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const TextSection = styled.div`
  flex: 1;
  padding: 40px;
  background-color: ${props => props.bgColor || '#fff'};
  color: ${props => props.textColor || '#333'};
  
  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 25px;
  line-height: 1.6;
`;

const Button = styled(Link)`
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

const PromotionBanner = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  imageUrl, 
  reverse = false,
  bgColor,
  textColor
}) => {
  return (
    <BannerContainer>
      <BannerContent reverse={reverse}>
        <ImageSection>
          <img src={imageUrl} alt={title} />
        </ImageSection>
        <TextSection bgColor={bgColor} textColor={textColor}>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Button to={buttonLink}>{buttonText}</Button>
        </TextSection>
      </BannerContent>
    </BannerContainer>
  );
};

export default PromotionBanner;
