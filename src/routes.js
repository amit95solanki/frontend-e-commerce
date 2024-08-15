import React, { useContext } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/user/pages/UserPage';
import LoginPage from './pages/auth/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/product/pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PrivateRoutes from './PrivateRoutes';

import ErrorsPage from './dummy/ErrorsPage';
import Logout from './dummy/Logout';
import AuthPage from './layouts/dashboard/DashboardLayout';
import AuthContext from './context/AuthProvider';

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useContext(AuthContext);
  console.log('user', user);

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/*" element={<PrivateRoutes />} />
          <Route index element={<Navigate to="/products" />} />
        </>
      ) : (
        <>
          <Route path="macho-man-shop/*" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/macho-man-shop/products" />} />
        </>
      )}
      <Route path="error/*" element={<ErrorsPage />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  );
}
