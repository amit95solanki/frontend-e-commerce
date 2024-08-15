import React, { Suspense, lazy, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterLayout from './layouts/MasterLayout';
import ProductsPage from './pages/product/pages/ProductsPage';
import { fetchItemsByUserIdAsync } from './pages/cart/cartSlice';
import AuthContext from './context/AuthProvider';
import SimpleLayout from './layouts/simple/SimpleLayout';

// Lazy loaded components
const ProductListPage = lazy(() => import('./pages/product/pages/index'));
const CartPage = lazy(() => import('./pages/cart/pages/Cart'));
const UserPage = lazy(() => import('./pages/user/pages/UserPage'));
const DetailView = lazy(() => import('./pages/product/pages/component/DetailView'));

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.user?._id) {
      dispatch(fetchItemsByUserIdAsync(user.user._id));
    }
  }, [dispatch, user?.user?._id]);

  return (
    <Routes>
      <Route element={user?.user?.role === 'admin' ? <MasterLayout /> : <SimpleLayout />}>
        {/* Redirect to Products after successful login/registration */}
        <Route path="macho-man-shop/*" element={<Navigate to="/products" />} />

        {/* Pages */}
        <Route path="products" element={<ProductsPage />} />

        <Route
          path="product-list/*"
          element={
            <SuspenseFallback>
              <ProductListPage />
            </SuspenseFallback>
          }
        />

        <Route
          path="cart"
          element={
            <SuspenseFallback>
              <CartPage />
            </SuspenseFallback>
          }
        />

        <Route
          path="user"
          element={
            <SuspenseFallback>
              <UserPage />
            </SuspenseFallback>
          }
        />

        <Route
          path="/products/:id"
          element={
            <SuspenseFallback>
              <DetailView />
            </SuspenseFallback>
          }
        />

        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const TopBarProgress = () => {
  return <div>Loading...</div>;
};

const SuspenseFallback = ({ children }) => {
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export default PrivateRoutes;
