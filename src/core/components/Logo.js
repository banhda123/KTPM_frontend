import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
  text-decoration: none;
`;

const LogoIcon = styled.div`
  color: #0066cc;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
`;

const Logo = () => {
  return (
    <LogoContainer to="/">
      <LogoIcon>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </LogoIcon>
      <LogoText>DoMart</LogoText>
    </LogoContainer>
  );
};

export default Logo;
