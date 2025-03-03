import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPen, FaBox, FaGraduationCap, FaPalette, FaTag, FaSteam, FaBook } from 'react-icons/fa';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  padding: 20px 0;
  height: 100%;
`;

const CategoryTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  padding: 0 20px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 2px;
`;

const CategoryLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #555;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
    color: #0066cc;
  }
  
  &.active {
    background-color: #e6f0ff;
    color: #0066cc;
    border-left: 3px solid #0066cc;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
`;

const SectionTitle = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #999;
  padding: 0 20px;
  margin: 30px 0 10px;
  letter-spacing: 1px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <CategoryTitle>Danh Sách Sản Phẩm</CategoryTitle>
      
      <CategoryList>
        <CategoryItem>
          <CategoryLink to="/products/stationery">
            <Icon><FaPen /></Icon>
            Bút viết
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/products/office-supplies">
            <Icon><FaBox /></Icon>
            Văn phòng phẩm
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/products/school-supplies">
            <Icon><FaGraduationCap /></Icon>
            Dụng Cụ Học Tập
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/products/art">
            <Icon><FaPalette /></Icon>
            Mỹ Thuật
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/products/paper">
            <Icon><FaBook /></Icon>
            Giấy In
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/products/premium">
            <Icon><FaTag /></Icon>
            Bút cao cấp
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/products/steam">
            <Icon><FaSteam /></Icon>
            STEAM & DIY
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/products/books">
            <Icon><FaBook /></Icon>
            Sách
          </CategoryLink>
        </CategoryItem>
      </CategoryList>
      
      <SectionTitle>Danh mục nổi bật</SectionTitle>
      <CategoryList>
        <CategoryItem>
          <CategoryLink to="/products/featured">
            Khách hàng thân thiết
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/products/priority">
            Khách hàng ưu tiên
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/products/business">
            Thiên Long Nội Bộ
          </CategoryLink>
        </CategoryItem>
      </CategoryList>
    </SidebarContainer>
  );
};

export default Sidebar;
