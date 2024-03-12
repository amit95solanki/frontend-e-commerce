import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import Form from './Form';

function Product() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/edit/:id" element={<Form />} />
      </Routes>
    </Suspense>
  );
}

export default Product;
