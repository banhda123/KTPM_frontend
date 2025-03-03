import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const PageList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PageItem = styled.li`
  margin: 0 5px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${props => props.active ? '#0066cc' : '#ddd'};
  background-color: ${props => props.active ? '#0066cc' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#0055aa' : '#f5f5f5'};
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

const PageEllipsis = styled.span`
  padding: 8px 12px;
  color: #666;
`;

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at the beginning or end
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <PaginationContainer>
      <PageList>
        {/* Previous button */}
        <PageItem>
          <PageButton 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </PageButton>
        </PageItem>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <PageItem key={index}>
            {page === '...' ? (
              <PageEllipsis>...</PageEllipsis>
            ) : (
              <PageButton
                active={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PageButton>
            )}
          </PageItem>
        ))}
        
        {/* Next button */}
        <PageItem>
          <PageButton 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </PageButton>
        </PageItem>
      </PageList>
    </PaginationContainer>
  );
};

export default Pagination;
