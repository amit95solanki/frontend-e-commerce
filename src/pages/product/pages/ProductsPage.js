import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import * as actions from '../_redux/actions';
// components
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from '../../../sections/@dashboard/products';
// mock
import PRODUCTS from '../../../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const [search, setSearch] = useState('a');
  const [sort, setSort] = useState('b');
  const [category, setCategory] = useState('c');
  const [price, setPrice] = useState('d');
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(actions.fetchItems({ search, sort, category, price, page }));
  }, [dispatch, search, sort, category, price, page]);

  const { actionsLoading, entities, totalCount } = useSelector(
    (state) => ({
      actionsLoading: state.product.actionsLoading,
      entities: state.product.entities,
      totalCount: state.product.totalCount,
    }),
    shallowEqual
  );

  console.log('data', entities, totalCount);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // console.log(PRODUCTS);

  return (
    <>
      <Helmet>
        <title> Product </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              setCategory={setCategory}
              setPrice={setPrice}
            />
            <ProductSort setSort={setSort} />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
