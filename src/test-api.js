// Test script to verify API functionality
import api from './services/api';

// Test function to run all API tests
async function testApi() {
  console.log('Testing API functionality...');
  
  try {
    // Test getting all products
    console.log('\n1. Testing getProducts:');
    const productsResult = await api.getProducts();
    console.log(`- Retrieved ${productsResult.data.length} products`);
    console.log('- First product:', productsResult.data[0]);
    
    // Test getting a single product
    console.log('\n2. Testing getProductById:');
    const productId = 'product-1';
    const productResult = await api.getProductById(productId);
    console.log(`- Retrieved product with ID ${productId}:`, productResult.data.name);
    console.log('- Product images:', productResult.data.images);
    
    // Test filtering products by category
    console.log('\n3. Testing getProducts with category filter:');
    const categoryResult = await api.getProducts({ category: 'Bút viết' });
    console.log(`- Retrieved ${categoryResult.data.length} products in category 'Bút viết'`);
    
    // Test pagination
    console.log('\n4. Testing pagination:');
    const page2Result = await api.getProducts({ page: 2, limit: 5 });
    console.log(`- Retrieved page 2 with ${page2Result.data.length} products`);
    console.log('- Pagination info:', page2Result.meta);
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Error during API testing:', error);
  }
}

// Export the test function
export default testApi;

// Auto-run the test if this file is executed directly
if (typeof window !== 'undefined' && window.location.pathname.includes('test-api')) {
  testApi();
}
