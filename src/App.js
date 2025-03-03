import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './core/layouts/MainLayout';

// Pages
import HomePage from './modules/home/views/HomePage';
import ProductListPage from './modules/products/views/ProductListPage';
import ProductDetailPage from './modules/products/views/ProductDetailPage';
import TestProductPage from './modules/products/views/TestProductPage';
import CartPage from './modules/cart/views/CartPage';
import CheckoutPage from './modules/checkout/views/CheckoutPage';
import ContactPage from './modules/contact/views/ContactPage';
import BlogPage from './modules/blog/views/BlogPage';
import LoginPage from './modules/auth/views/LoginPage';
import RegisterPage from './modules/auth/views/RegisterPage';
import NotFoundPage from './core/components/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="test-products" element={<TestProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
