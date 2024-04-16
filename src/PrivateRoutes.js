import React, { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterLayout from './layouts/MasterLayout';
import UserPage from './pages/user/pages/UserPage';
import ProductsPage from './pages/product/pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import SignupPage from './pages/auth/SignupPage';
import ForgetPassword from './sections/auth/pages/ForgetPassword';
import { fetchItemsByUserIdAsync } from './pages/cart/_redux/cartSlice';
import DetailView from './pages/product/pages/component/DetailView';
import Cart from './pages/cart/_redux/pages/Cart';

// import ProductList from './pages/product/pages/ProductList';

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const ids = 'string';
  const ProductListPage = lazy(() => import('./pages/product/pages/index'));

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(ids));
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route element={<MasterLayout />}>
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path="macho-man-shop/*" element={<Navigate to="/dashboard" />} />
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

          <Route path="blog" element={<BlogPage />} />

          <Route path="forget-password" element={<ForgetPassword />} />
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
