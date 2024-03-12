import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterLayout from './layouts/MasterLayout';
import UserPage from './pages/user/pages/UserPage';
import ProductsPage from './pages/product/pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import ProductDatailPage from './pages/product/pages/ProductDatailPage';
// import ProductList from './pages/product/pages/ProductList';

const PrivateRoutes = () => {
  const ProductListPage = lazy(() => import('./pages/product/pages/index'));
  return (
    <>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="product-detail" element={<ProductDatailPage />} />
        </Route>

        <Route element={<MasterLayout />}>
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path="auth/*" element={<Navigate to="/dashboard" />} />
          {/* Pages */}
          <Route path="dashboard" element={<DashboardAppPage />} />

          <Route
            path="product-list/*"
            element={
              <SuspensedView>
                <ProductListPage />
              </SuspensedView>
            }
          />

          <Route path="user" element={<UserPage />} />

          <Route path="products" element={<ProductsPage />} />

          {/* <Route path="products-list" element={<ProductList />} /> */}

          <Route path="blog" element={<BlogPage />} />

          {/* <Route path="login" element={<LoginPage />} /> */}

          <Route path="*" element={<Navigate to="/error/404" />} />
        </Route>
      </Routes>
    </>
  );
};
const TopBarProgress = () => {
  return <div>Loading...</div>;
};
const SuspensedView = ({ children }) => {
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export default PrivateRoutes;
