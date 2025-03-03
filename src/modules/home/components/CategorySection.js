import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPen, FaBox, FaGraduationCap, FaPalette, FaTag } from 'react-icons/fa';

const SectionContainer = styled.div`
  margin: 40px 0;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const CategoryCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  background-color: #e6f0ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  color: #0066cc;
  font-size: 1.5rem;
`;

const CategoryName = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
  text-align: center;
`;

const ProductCount = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const CategorySection = () => {
  // Mock category data
  const categories = [
    {
      id: 'cat-1',
      name: 'Cầm nắng nổi bật',
      count: 120,
      icon: <FaPen />,
      link: '/products/stationery'
    },
    {
      id: 'cat-2',
      name: 'Sản phẩm mới',
      count: 85,
      icon: <FaBox />,
      link: '/products/new'
    },
    {
      id: 'cat-3',
      name: 'Outlet chính hãng',
      count: 64,
      icon: <FaGraduationCap />,
      link: '/products/outlet'
    },
    {
      id: 'cat-4',
      name: 'Giải pháp in ấn',
      count: 42,
      icon: <FaPalette />,
      link: '/products/printing'
    },
    {
      id: 'cat-5',
      name: 'Văn phòng phẩm doanh nghiệp',
      count: 38,
      icon: <FaTag />,
      link: '/products/business'
    }
  ];
  
  return (
    <SectionContainer>
      <CategoryGrid>
        {categories.map(category => (
          <CategoryCard key={category.id} to={category.link}>
            <IconContainer>
              {category.icon}
            </IconContainer>
            <CategoryName>{category.name}</CategoryName>
            <ProductCount>{category.count} sản phẩm</ProductCount>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </SectionContainer>
  );
};

export default CategorySection;
