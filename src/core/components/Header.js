import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import SearchBar from './SearchBar';
import Logo from './Logo';

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #333;
  font-weight: 500;
  padding: 5px 10px;
  transition: color 0.3s;

  &:hover {
    color: #0066cc;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconLink = styled(Link)`
  color: #333;
  font-size: 1.2rem;
  position: relative;
  
  &:hover {
    color: #0066cc;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff6600;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
`;

const Header = () => {
  const cartItemCount = 2; // This would come from your cart state/context
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo />
        
        <Navigation>
          <NavLink to="/">Trang Chủ</NavLink>
          <NavLink to="/products">Cửa Hàng</NavLink>
          <NavLink to="/blog">Bài Viết</NavLink>
          <NavLink to="/contact">Liên Hệ</NavLink>
        </Navigation>
        
        <HeaderActions>
          <SearchBar />
          
          <IconLink to="/login">
            <FaUser />
          </IconLink>
          
          <IconLink to="/cart">
            <FaShoppingCart />
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </IconLink>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
