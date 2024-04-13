import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import { useDataContext } from '../../../context/globalContext';
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
import { addToCartAsync, selectItems } from '../../cart/_redux/cartSlice';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { search, setSearch } = useDataContext();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);

  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
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

  const items = useSelector(selectItems);
  // console.log('items: 123', items);

  const handleCart = (product) => {
    const isPresent = items.some((item) => item.product._id === product._id);
    if (!isPresent) {
      const newItem = {
        product: product._id,
        quantity: 1,
        user: 'string',
      };
      dispatch(addToCartAsync({ item: newItem }));
      alert('items add successfully');
    } else {
      alert('Item Already added');
    }
  };

  return (
    <>
      <Helmet>
        <title> Product </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          <i> Macho Man Shop</i>
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              setCategory={setCategory}
              setPrice={setPrice}
              category={category}
            />
            <ProductSort setSort={setSort} sort={sort} />
          </Stack>
        </Stack>

        <ProductList products={entities} handleCart={handleCart} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
