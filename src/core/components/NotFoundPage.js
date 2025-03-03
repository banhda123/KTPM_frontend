import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 500px;
  margin-bottom: 30px;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 12px 25px;
  background-color: #0066cc;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0055aa;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <Title>Trang không tồn tại</Title>
      <Description>
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </Description>
      <HomeButton to="/">Quay lại trang chủ</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
