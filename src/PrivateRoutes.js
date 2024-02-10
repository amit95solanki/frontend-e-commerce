import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterLayout from './layouts/MasterLayout';
import UserPage from './pages/UserPage';
import ProductsPage from './pages/product/pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/dashboard/DashboardLayout';

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="products" element={<ProductsPage />} />
        </Route>

        <Route element={<MasterLayout />}>
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path="auth/*" element={<Navigate to="/dashboard" />} />
          {/* Pages */}
          <Route path="dashboard" element={<DashboardAppPage />} />

          <Route path="user" element={<UserPage />} />

          <Route path="products" element={<ProductsPage />} />

          <Route path="blog" element={<BlogPage />} />

          {/* <Route path="login" element={<LoginPage />} /> */}

          <Route path="*" element={<Navigate to="/error/404" />} />
        </Route>
      </Routes>
    </>
  );
};

export default PrivateRoutes;
