import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../../../core/components/LoadingSpinner';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const StatusMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: ${props => props.error ? '#ffeeee' : '#eeffee'};
  border: 1px solid ${props => props.error ? '#ffcccc' : '#ccffcc'};
  border-radius: 4px;
`;

const TestProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testStatus, setTestStatus] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await api.getProducts();
        console.log('API Response:', result);
        
        if (result && result.data) {
          setProducts(result.data);
          setTestStatus({
            success: true,
            message: `Successfully loaded ${result.data.length} products from the API`
          });
        } else {
          setError('API response does not contain expected data structure');
          setTestStatus({
            success: false,
            message: 'API response format error: missing data property'
          });
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setTestStatus({
          success: false,
          message: `API error: ${err.message || 'Unknown error'}`
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Title>Product Display Test Page</Title>
      
      {testStatus && (
        <StatusMessage error={!testStatus.success}>
          <strong>Test Status:</strong> {testStatus.message}
        </StatusMessage>
      )}
      
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <StatusMessage error>{error}</StatusMessage>
      ) : (
        <>
          <h2>Displaying {products.length} Products</h2>
          <ProductGrid>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </>
      )}
    </Container>
  );
};

export default TestProductPage;
