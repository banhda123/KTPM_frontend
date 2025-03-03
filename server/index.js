const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
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
  images: [
    `https://placehold.co/300x300/f0f0f0/333333?text=Product-${index + 1}`,
    `https://placehold.co/300x300/f0f0f0/333333?text=Product-${index + 1}-2`,
    `https://placehold.co/300x300/f0f0f0/333333?text=Product-${index + 1}-3`
  ],
  stock: index % 7 === 0 ? 0 : 10 + (index * 2),
  rating: 3 + (Math.random() * 2),
  reviews: Array(3).fill().map((_, i) => ({
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
}));

// Routes
// Get all products with optional filtering
app.get('/products', (req, res) => {
  const { 
    category, 
    featured, 
    new: isNew, 
    sort, 
    order = 'asc',
    page = 1, 
    limit = 10,
    search
  } = req.query;
  
  let filteredProducts = [...products];
  
  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(p => p.featured);
  }
  
  if (isNew === 'true') {
    filteredProducts = filteredProducts.filter(p => p.new);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  if (sort) {
    const direction = order === 'asc' ? 1 : -1;
    filteredProducts.sort((a, b) => {
      if (sort === 'price') {
        return direction * ((a.salePrice || a.price) - (b.salePrice || b.price));
      } else if (sort === 'name') {
        return direction * a.name.localeCompare(b.name);
      } else if (sort === 'rating') {
        return direction * (a.rating - b.rating);
      } else if (sort === 'createdAt') {
        return direction * (new Date(a.createdAt) - new Date(b.createdAt));
      }
      return 0;
    });
  }
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedProducts,
    meta: {
      total: filteredProducts.length,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(filteredProducts.length / limit)
    }
  });
});

// Get a single product by ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json({ data: product });
});

// Auth routes
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'user@example.com' && password === 'password') {
    res.json({
      data: {
        id: 'user-1',
        name: 'Nguyễn Văn A',
        email: 'user@example.com',
        token: 'mock-jwt-token'
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log(`- GET http://localhost:${PORT}/products`);
  console.log(`- GET http://localhost:${PORT}/products/:id`);
  console.log(`- POST http://localhost:${PORT}/auth/login`);
});
