import React from 'react';
import styled from 'styled-components';
import { FaSort } from 'react-icons/fa';

const DropdownContainer = styled.div`
  position: relative;
  min-width: 200px;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: border-color 0.3s;
  
  &:hover, &:focus {
    border-color: #0066cc;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  margin-top: 5px;
  padding: 5px 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.li`
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &.active {
    background-color: #e6f0ff;
    color: #0066cc;
    font-weight: 500;
  }
`;

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };
  
  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price-asc', label: 'Giá: Thấp đến cao' },
    { value: 'price-desc', label: 'Giá: Cao đến thấp' },
    { value: 'name-asc', label: 'Tên: A-Z' },
    { value: 'name-desc', label: 'Tên: Z-A' },
    { value: 'popular', label: 'Phổ biến nhất' }
  ];
  
  const selectedOption = sortOptions.find(option => option.value === value) || sortOptions[0];
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sort-dropdown')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <DropdownContainer className="sort-dropdown">
      <DropdownButton onClick={toggleDropdown}>
        <span><FaSort /> Sắp xếp theo</span>
        <span>{selectedOption.label}</span>
      </DropdownButton>
      
      <DropdownMenu isOpen={isOpen}>
        {sortOptions.map(option => (
          <DropdownItem
            key={option.value}
            className={option.value === value ? 'active' : ''}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default SortDropdown;
