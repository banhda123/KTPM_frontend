import axios from 'axios';

// Create an axios instance with default config
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error);
      // You could dispatch to a global error state here
    }
    
    return Promise.reject(error);
  }
);

// Mock API service for development without a backend
export const mockApi = {
  // Products
  getProducts: (params = {}) => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate mock products
        const products = Array(20).fill().map((_, index) => ({
          id: `product-${index + 1}`,
          name: `Bút Thiên Long FlexOffice FO-0${index + 1}`,
          price: 20000 + (index * 5000),
          salePrice: index % 3 === 0 ? (20000 + (index * 5000)) * 0.8 : null,
          description: 'Bút bi cao cấp với thiết kế hiện đại, mực viết trơn tru và bền màu.',
          category: index % 5 === 0 ? 'Bút viết' : 
                    index % 5 === 1 ? 'Văn phòng phẩm' : 
                    index % 5 === 2 ? 'Dụng cụ học tập' : 
                    index % 5 === 3 ? 'Mỹ thuật' : 'Giấy in',
          images: [`https://placehold.co/300x300/f0f0f0/333333?text=Product-${index + 1}`],
          stock: index % 7 === 0 ? 0 : 10 + (index * 2),
          rating: 3 + (Math.random() * 2),
          reviews: [],
          featured: index % 10 === 0,
          new: index % 8 === 0,
          specifications: {},
          createdAt: new Date(Date.now() - (index * 86400000)).toISOString(),
          updatedAt: new Date().toISOString()
        }));
        
        // Apply filtering based on params
        let filteredProducts = [...products];
        
        if (params.category) {
          filteredProducts = filteredProducts.filter(p => p.category === params.category);
        }
        
        if (params.featured) {
          filteredProducts = filteredProducts.filter(p => p.featured);
        }
        
        if (params.new) {
          filteredProducts = filteredProducts.filter(p => p.new);
        }
        
        // Apply sorting
        if (params.sort) {
          const direction = params.order === 'asc' ? 1 : -1;
          filteredProducts.sort((a, b) => {
            if (params.sort === 'price') {
              return direction * ((a.salePrice || a.price) - (b.salePrice || b.price));
            } else if (params.sort === 'name') {
              return direction * a.name.localeCompare(b.name);
            } else if (params.sort === 'rating') {
              return direction * (a.rating - b.rating);
            } else if (params.sort === 'createdAt') {
              return direction * (new Date(a.createdAt) - new Date(b.createdAt));
            }
            return 0;
          });
        }
        
        // Apply pagination
        const page = params.page || 1;
        const limit = params.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        resolve({
          data: paginatedProducts,
          meta: {
            total: filteredProducts.length,
            page: page,
            limit: limit,
            pages: Math.ceil(filteredProducts.length / limit)
          }
        });
      }, 500);
    });
  },
  
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Generate a mock product based on the ID
        const index = parseInt(id.split('-')[1]) || 1;
        const product = {
          id,
          name: `Bút Thiên Long FlexOffice FO-0${index}`,
          price: 20000 + (index * 5000),
          salePrice: index % 3 === 0 ? (20000 + (index * 5000)) * 0.8 : null,
          description: 'Bút bi cao cấp với thiết kế hiện đại, mực viết trơn tru và bền màu. Sản phẩm được sản xuất theo công nghệ tiên tiến, đảm bảo chất lượng và độ bền cao. Phù hợp cho học sinh, sinh viên và nhân viên văn phòng.',
          category: index % 5 === 0 ? 'Bút viết' : 
                    index % 5 === 1 ? 'Văn phòng phẩm' : 
                    index % 5 === 2 ? 'Dụng cụ học tập' : 
                    index % 5 === 3 ? 'Mỹ thuật' : 'Giấy in',
          images: [
            `https://placehold.co/600x400/f0f0f0/333333?text=Product-${index}-1`,
            `https://placehold.co/600x400/f0f0f0/333333?text=Product-${index}-2`,
            `https://placehold.co/600x400/f0f0f0/333333?text=Product-${index}-3`
          ],
          stock: index % 7 === 0 ? 0 : 10 + (index * 2),
          rating: 3 + (Math.random() * 2),
          reviews: Array(5).fill().map((_, i) => ({
            id: `review-${i}`,
            user: `User ${i + 1}`,
            rating: 3 + Math.floor(Math.random() * 3),
            comment: 'Sản phẩm chất lượng tốt, đóng gói cẩn thận, giao hàng nhanh.',
            date: new Date(Date.now() - (i * 86400000 * 3)).toISOString()
          })),
          featured: index % 10 === 0,
          new: index % 8 === 0,
          specifications: {
            'Thương hiệu': 'Thiên Long',
            'Xuất xứ': 'Việt Nam',
            'Chất liệu': 'Nhựa cao cấp',
            'Màu mực': 'Xanh/Đen/Đỏ',
            'Độ mịn': '0.5mm'
          },
          createdAt: new Date(Date.now() - (index * 86400000)).toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        if (id.includes('invalid')) {
          reject({ message: 'Product not found' });
        } else {
          resolve({ data: product });
        }
      }, 300);
    });
  },
  
  // Auth
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          const userData = {
            id: 'user-1',
            name: 'Nguyễn Văn A',
            email: 'user@example.com',
            token: 'mock-jwt-token'
          };
          resolve({ data: userData });
        } else {
          reject({ message: 'Invalid credentials' });
        }
      }, 500);
    });
  },
  
  // Cart
  getCart: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cart = {
          items: [
            {
              id: 'cart-item-1',
              productId: 'product-1',
              name: 'Bút Thiên Long FlexOffice FO-01',
              price: 22000,
              salePrice: null,
              image: 'https://via.placeholder.com/100',
              quantity: 2
            },
            {
              id: 'cart-item-2',
              productId: 'product-3',
              name: 'Bút Thiên Long FlexOffice FO-03',
              price: 30000,
              salePrice: 24000,
              image: 'https://via.placeholder.com/100',
              quantity: 1
            }
          ],
          totalItems: 3,
          subtotal: 68000,
          discount: 6000,
          total: 62000
        };
        resolve({ data: cart });
      }, 300);
    });
  }
};

// Export default API (can be switched between real and mock)
export default process.env.REACT_APP_USE_MOCK_API === 'true' ? mockApi : api;
