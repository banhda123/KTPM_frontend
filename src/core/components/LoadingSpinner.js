import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 102, 204, 0.1);
  border-radius: 50%;
  border-top-color: #0066cc;
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingText = styled.p`
  margin-left: 15px;
  color: #666;
  font-size: 1rem;
`;

const LoadingSpinner = ({ text = 'Đang tải...' }) => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
