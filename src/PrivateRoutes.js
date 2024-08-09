import React, { Suspense, lazy, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterLayout from './layouts/MasterLayout';
import UserPage from './pages/user/pages/UserPage';
import ProductsPage from './pages/product/pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/auth/LoginPage';
import { DashboardLayout } from './layouts/dashboard/DashboardLayout';
import SignupPage from './pages/auth/SignupPage';
import ForgetPassword from './sections/auth/pages/ForgetPassword';
import { fetchItemsByUserIdAsync } from './pages/cart/cartSlice';
// import DetailView from './pages/product/pages/component/DetailView';
import Cart from './pages/cart/pages/Cart';
import AuthContext from './context/AuthProvider';
import SimpleLayout from './layouts/simple/SimpleLayout';
import DetailView from './pages/product/pages/component/DetailView';

// import ProductList from './pages/product/pages/ProductList';

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  const ProductListPage = lazy(() => import('./pages/product/pages/index'));

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(user?.user?._id));
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route element={user?.user?.role === 'admin' ? <MasterLayout /> : <DashboardLayout />}>
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
          <Route path="cart" element={<Cart />} />
          <Route path="user" element={<UserPage />} />
          <Route path="products" element={<ProductsPage />} />

          <Route path="/products/:id" element={<DetailView />} />
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
