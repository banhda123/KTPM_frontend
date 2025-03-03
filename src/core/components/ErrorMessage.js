import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: #fff5f5;
  border: 1px solid #ffcccc;
  border-radius: 4px;
  padding: 20px;
  margin: 20px 0;
  color: #cc0000;
  text-align: center;
`;

const ErrorTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const ErrorText = styled.p`
  margin-bottom: 15px;
`;

const RetryButton = styled.button`
  background-color: #cc0000;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #aa0000;
  }
`;

const ErrorMessage = ({ 
  title = 'Đã xảy ra lỗi', 
  message = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
  onRetry
}) => {
  return (
    <ErrorContainer>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorText>{message}</ErrorText>
      {onRetry && (
        <RetryButton onClick={onRetry}>
          Thử lại
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

export default ErrorMessage;
