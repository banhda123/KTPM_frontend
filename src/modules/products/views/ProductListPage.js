import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductController from '../controllers/ProductController';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import Pagination from '../../../core/components/Pagination';
import LoadingSpinner from '../../../core/components/LoadingSpinner';
import ErrorMessage from '../../../core/components/ErrorMessage';

const ProductListContainer = styled.div`
  padding: 20px 0;
`;

const ProductListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
`;

const ProductCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #666;
`;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState('newest');
  const [filters, setFilters] = useState({});
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page')) || 1;
    const sort = queryParams.get('sort') || 'newest';
    const category = queryParams.get('category') || '';
    const search = queryParams.get('search') || '';
    
    setCurrentPage(page);
    setSortOption(sort);
    
    const newFilters = {};
    if (category) newFilters.category = category;
    if (search) newFilters.search = search;
    setFilters(newFilters);
    
  }, [location.search]);
  
  // Fetch products based on filters, sorting, and pagination
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Prepare API parameters
        const params = {
          ...filters,
          page: currentPage,
          limit: itemsPerPage,
        };
        
        // Add sorting parameters
        switch (sortOption) {
          case 'price-asc':
            params.sort = 'price';
            params.order = 'asc';
            break;
          case 'price-desc':
            params.sort = 'price';
            params.order = 'desc';
            break;
          case 'name-asc':
            params.sort = 'name';
            params.order = 'asc';
            break;
          case 'name-desc':
            params.sort = 'name';
            params.order = 'desc';
            break;
          case 'popular':
            params.sort = 'rating';
            params.order = 'desc';
            break;
          case 'newest':
          default:
            params.sort = 'createdAt';
            params.order = 'desc';
            break;
        }
        
        let result;
        if (filters.search) {
          result = await ProductController.searchProducts(filters.search, params);
        } else if (filters.category) {
          result = await ProductController.getProductsByCategory(filters.category, params);
        } else {
          result = await ProductController.getAllProducts(params);
        }
        
        setProducts(result);
        setTotalItems(100); // This would come from API response in a real app
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [currentPage, itemsPerPage, sortOption, filters]);
  
  // Update URL when filters, sorting, or pagination changes
  useEffect(() => {
    const queryParams = new URLSearchParams();
    
    if (currentPage > 1) {
      queryParams.set('page', currentPage.toString());
    }
    
    if (sortOption !== 'newest') {
      queryParams.set('sort', sortOption);
    }
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.set(key, value);
    });
    
    const queryString = queryParams.toString();
    navigate({
      pathname: location.pathname,
      search: queryString ? `?${queryString}` : ''
    }, { replace: true });
    
  }, [currentPage, sortOption, filters, navigate, location.pathname]);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  // Handle sort change
  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to first page when sorting changes
  };
  
  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  // Get page title based on filters
  const getPageTitle = () => {
    if (filters.search) {
      return `Kết quả tìm kiếm: "${filters.search}"`;
    } else if (filters.category) {
      return filters.category;
    }
    return 'Tất cả sản phẩm';
  };
  
  return (
    <ProductListContainer>
      <ProductListHeader>
        <div>
          <Title>{getPageTitle()}</Title>
          {!loading && <ProductCount>{totalItems} sản phẩm</ProductCount>}
        </div>
        <ControlsContainer>
          <SortDropdown value={sortOption} onChange={handleSortChange} />
        </ControlsContainer>
      </ProductListHeader>
      
      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : products.length > 0 ? (
        <>
          <ProductGrid>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
          
          <Pagination 
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <NoProducts>
          <p>Không tìm thấy sản phẩm nào phù hợp với tiêu chí tìm kiếm.</p>
        </NoProducts>
      )}
    </ProductListContainer>
  );
};

export default ProductListPage;
