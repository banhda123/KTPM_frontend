import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFilter, FaAngleDown, FaAngleRight } from 'react-icons/fa';

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

const CategoryMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CategoryItem = styled.div`
  border-bottom: 1px solid #eee;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  font-weight: ${props => props.isActive ? '600' : '400'};
  color: ${props => props.isActive ? '#0066cc' : '#333'};
  
  &:hover {
    color: #0066cc;
  }
`;

const CategoryName = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubcategoryList = styled.div`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  padding-left: 20px;
`;

const SubcategoryItem = styled.div`
  padding: 8px 0;
  cursor: pointer;
  color: #555;
  
  &:hover {
    color: #0066cc;
  }
`;

const FilterPanel = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState({});
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
  
  const toggleCategory = (categoryId) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const handleCategoryClick = (categoryId) => {
    toggleCategory(categoryId);
    
    // You can also implement category selection here if needed
    // For example:
    // onFilterChange({ ...localFilters, category: categoryId });
  };
  
  const handleSubcategoryClick = (categoryId, subcategory) => {
    // Implement subcategory selection logic here
    // For example:
    // onFilterChange({ ...localFilters, category: categoryId, subcategory });
    
    // For now, we'll just log the selection
    console.log(`Selected: ${categoryId} > ${subcategory}`);
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
  
  const productCategories = [
    {
      id: 'cat1',
      name: 'Bút viết',
      subcategories: [
        'Bút bi, bút mực, bút chì',
        'Bút dạ quang, bút lông dầu',
        'Bút gel, bút máy, bút dạ bảng',
        'Bút xoá, bút thử điện'
      ]
    },
    {
      id: 'cat2',
      name: 'Văn phòng phẩm',
      subcategories: [
        'Kẹp giấy, kẹp bướm, gim bấm',
        'Băng keo, hồ dán, kéo',
        'Tập vở, sổ ghi chép, sổ tay',
        'Bìa hồ sơ, bìa nhựa, file đựng giấy',
        'Máy dập ghim, bấm lỗ, dao rọc giấy'
      ]
    },
    {
      id: 'cat3',
      name: 'Dụng Cụ Học Tập',
      subcategories: [
        'Thước kẻ, ê ke, compa',
        'Bảng vẽ, bảng con, phấn viết',
        'Cặp sách, balo, hộp bút',
        'Tẩy, chuốt bút chì'
      ]
    },
    {
      id: 'cat4',
      name: 'Mỹ Thuật',
      subcategories: [
        'Màu nước, màu sáp, màu acrylic',
        'Bút lông vẽ, cọ vẽ, bảng pha màu',
        'Đất nặn, giấy mỹ thuật, giấy màu',
        'Canvas vẽ tranh, giá vẽ'
      ]
    },
    {
      id: 'cat5',
      name: 'Giấy In',
      subcategories: [
        'Giấy A4, A3, A5',
        'Giấy decal, giấy ảnh, giấy than',
        'Giấy in nhiệt, giấy in hóa đơn'
      ]
    },
    {
      id: 'cat6',
      name: 'Bút cao cấp',
      subcategories: [
        'Bút máy cao cấp, bút ký tên',
        'Bút bi thương hiệu, bút quà tặng',
        'Bút khắc tên, bút làm quà tặng doanh nghiệp'
      ]
    },
    {
      id: 'cat7',
      name: 'STEAM & DIY',
      subcategories: [
        'Bộ lắp ráp mô hình',
        'Đồ chơi khoa học, STEM',
        'Robot lập trình, kit Arduino, Raspberry Pi',
        'Dụng cụ DIY, keo nến, máy cắt laser mini'
      ]
    },
    {
      id: 'cat8',
      name: 'Sách',
      subcategories: [
        'Sách giáo khoa, sách tham khảo',
        'Truyện tranh, tiểu thuyết, sách kỹ năng',
        'Sách học ngoại ngữ, từ điển',
        'Sách tô màu, sách vẽ tranh'
      ]
    }
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
          <SectionTitle>Danh mục sản phẩm</SectionTitle>
          <CategoryMenu>
            {productCategories.map((category) => (
              <CategoryItem key={category.id}>
                <CategoryHeader 
                  isActive={openCategories[category.id]} 
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CategoryName>
                    {openCategories[category.id] ? <FaAngleDown /> : <FaAngleRight />}
                    {category.name}
                  </CategoryName>
                </CategoryHeader>
                <SubcategoryList isOpen={openCategories[category.id]}>
                  {category.subcategories.map((subcategory, index) => (
                    <SubcategoryItem 
                      key={index}
                      onClick={() => handleSubcategoryClick(category.id, subcategory)}
                    >
                      {subcategory}
                    </SubcategoryItem>
                  ))}
                </SubcategoryList>
              </CategoryItem>
            ))}
          </CategoryMenu>
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
