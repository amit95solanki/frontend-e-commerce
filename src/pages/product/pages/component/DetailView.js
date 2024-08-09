import React, { useContext, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled, Box, Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { addToCartAsync, selectItems } from '../../../cart/cartSlice';

import { ProductCartWidget } from '../../../../sections/@dashboard/products';
import * as actions from '../../_redux/actions';
import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import AuthContext from '../../../../context/AuthProvider';

const Component = styled(Box)`
  margin-top: 55px;
  background: #f2f2f2;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: '#FFFFFF',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    margin: 0,
  },
}));

const RightContainer = styled(Grid)`
  padding: 0px 20px;
  margin-top: 50px;
  & > p {
    margin-top: 10px;
  }
`;

const DetailView = () => {
  const { user } = useContext(AuthContext);

  const fassured = 'https://cdn2.vectorstock.com/i/1000x1000/66/21/assured-rubber-stamp-vector-17186621.jpg';

  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchItem(id));
  }, [dispatch]);

  const { actionsLoading, data, totalCount } = useSelector(
    (state) => ({
      actionsLoading: state.product.actionsLoading,
      data: state.product.data,
      totalCount: state.product.totalCount,
    }),
    shallowEqual
  );
  const items = useSelector(selectItems);
  console.log('data', items);

  const product = data?.product;

  const handleCart = (product) => {
    if (!user) {
      alert('first go to login then add to wish card');
      return;
    }

    const isPresent = items.some((item) => item.product === product._id);

    if (!isPresent) {
      const newItem = {
        product: product._id,
        quantity: 1,
        user: user?.user?._id,
      };
      dispatch(addToCartAsync({ item: newItem }));
      alert('items add successfully');
    } else {
      alert('Item Already added');
    }
  };

  return (
    <Component>
      {product && Object.keys(product).length && (
        <Container container>
          <Grid item lg={4} md={4} sm={8} xs={12}>
            <ActionItem product={product} handleCart={handleCart} />
          </Grid>
          <RightContainer item lg={8} md={8} sm={8} xs={12}>
            {/* <Typography></Typography> */}
            <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>
              8 Ratings & 1 Reviews
              <span>
                <img src={fassured} alt="imag" style={{ width: 60, height: 30, marginLeft: 20 }} />
              </span>
            </Typography>
            <Typography>
              <span style={{ fontSize: 28 }}>₹{product?.price}</span>&nbsp;&nbsp;&nbsp;
              <span style={{ color: '#878787' }}>{/* <strike>₹{product?.price}</strike> */}</span>
              &nbsp;&nbsp;&nbsp;
              {/* <span style={{ color: '#388E3C' }}>{product.price.discount} off</span> */}
            </Typography>
            <ProductCartWidget />
            <ProductDetail product={product} />
          </RightContainer>
        </Container>
      )}
    </Component>
  );
};

DetailView.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.object,
    price: PropTypes.object,
  }),
};

export default DetailView;
