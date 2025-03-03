import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';

const FilterContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    color: #0066cc;
  }
`;

const FilterContent = styled.div`
  padding: ${props => props.isOpen ? '20px' : '0'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s;
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  
  &:hover {
    color: #0066cc;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const PriceRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RangeSlider = styled.input`
  width: 100%;
  margin: 10px 0;
`;

const PriceInputs = styled.div`
  display: flex;
  gap: 10px;
`;

const PriceInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    border-color: #0066cc;
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
`;

const ApplyButton = styled(Button)`
  background-color: #0066cc;
  color: white;
  border: none;
  
  &:hover {
    background-color: #0055aa;
  }
`;

const ResetButton = styled(Button)`
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const FilterPanel = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localFilters, setLocalFilters] = useState({
    categories: [],
    priceMin: '',
    priceMax: '',
    brands: [],
    inStock: false,
    onSale: false,
    ...filters
  });
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    
    setLocalFilters(prev => {
      const newCategories = checked
        ? [...prev.categories, value]
        : prev.categories.filter(cat => cat !== value);
      
      return { ...prev, categories: newCategories };
    });
  };
  
  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    
    setLocalFilters(prev => {
      const newBrands = checked
        ? [...prev.brands, value]
        : prev.brands.filter(brand => brand !== value);
      
      return { ...prev, brands: newBrands };
    });
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: checked }));
  };
  
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };
  
  const handleResetFilters = () => {
    const resetFilters = {
      categories: [],
      priceMin: '',
      priceMax: '',
      brands: [],
      inStock: false,
      onSale: false
    };
    
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  // Mock categories and brands
  const categories = [
    { id: 'cat1', name: 'Bút viết' },
    { id: 'cat2', name: 'Văn phòng phẩm' },
    { id: 'cat3', name: 'Dụng cụ học tập' },
    { id: 'cat4', name: 'Mỹ thuật' },
    { id: 'cat5', name: 'Giấy in' }
  ];
  
  const brands = [
    { id: 'brand1', name: 'Thiên Long' },
    { id: 'brand2', name: 'Flexoffice' },
    { id: 'brand3', name: 'Stabilo' },
    { id: 'brand4', name: 'Pentel' },
    { id: 'brand5', name: 'Artline' }
  ];
  
  return (
    <FilterContainer>
      <FilterHeader onClick={togglePanel}>
        <FilterTitle>
          <FaFilter />
          Bộ lọc sản phẩm
        </FilterTitle>
        <ToggleButton>
          {isOpen ? 'Thu gọn' : 'Mở rộng'}
        </ToggleButton>
      </FilterHeader>
      
      <FilterContent isOpen={isOpen}>
        <FilterSection>
          <SectionTitle>Danh mục</SectionTitle>
          <CheckboxGroup>
            {categories.map(category => (
              <CheckboxLabel key={category.id}>
                <Checkbox 
                  type="checkbox" 
                  value={category.id}
                  checked={localFilters.categories.includes(category.id)}
                  onChange={handleCategoryChange}
                />
                {category.name}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterSection>
        
        <FilterSection>
          <SectionTitle>Khoảng giá</SectionTitle>
          <PriceRangeContainer>
            <PriceInputs>
              <PriceInput 
                type="number" 
                placeholder="Từ" 
                name="priceMin"
                value={localFilters.priceMin}
                onChange={handlePriceChange}
              />
              <PriceInput 
                type="number" 
                placeholder="Đến" 
                name="priceMax"
                value={localFilters.priceMax}
                onChange={handlePriceChange}
              />
            </PriceInputs>
          </PriceRangeContainer>
        </FilterSection>
        
        <FilterSection>
          <SectionTitle>Thương hiệu</SectionTitle>
          <CheckboxGroup>
            {brands.map(brand => (
              <CheckboxLabel key={brand.id}>
                <Checkbox 
                  type="checkbox" 
                  value={brand.id}
                  checked={localFilters.brands.includes(brand.id)}
                  onChange={handleBrandChange}
                />
                {brand.name}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterSection>
        
        <FilterSection>
          <SectionTitle>Tình trạng</SectionTitle>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox 
                type="checkbox" 
                name="inStock"
                checked={localFilters.inStock}
                onChange={handleCheckboxChange}
              />
              Còn hàng
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox 
                type="checkbox" 
                name="onSale"
                checked={localFilters.onSale}
                onChange={handleCheckboxChange}
              />
              Đang giảm giá
            </CheckboxLabel>
          </CheckboxGroup>
        </FilterSection>
        
        <ButtonGroup>
          <ResetButton onClick={handleResetFilters}>Đặt lại</ResetButton>
          <ApplyButton onClick={handleApplyFilters}>Áp dụng</ApplyButton>
        </ButtonGroup>
      </FilterContent>
    </FilterContainer>
  );
};

export default FilterPanel;
