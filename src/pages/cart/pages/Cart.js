import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

import { fetchItemsByUserIdAsync, selectItems } from '../cartSlice';
import AuthContext from '../../../context/AuthProvider';

const Component = styled(Grid)(({ theme }) => ({
  padding: '30px 135px',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    padding: '15px 0',
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down('sm')]: {
    marginBottom: 15,
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const Cart = () => {
  const [price, setPrice] = useState(0);

  const [totalItems, setTotalItems] = useState(0);

  const cartItems = useSelector(selectItems);
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  console.log('user?.user?._id', user?.user?._id);

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(user?.user?._id));
  }, [dispatch]);

  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  const totalAmount = () => {
    let price = 0;

    cartItems.forEach((item) => {
      price += item.product.price * item.quantity;
    });
    setPrice(price);
  };

  useEffect(() => {
    // const calculatedTotalAmount = items.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
    const calculatedTotalItems = cartItems.reduce((total, item) => item.quantity + total, 0);

    setTotalItems(calculatedTotalItems);
  }, [cartItems]);
  console.log('cartItems', cartItems, '=====>', totalItems);

  const buyNow = async () => {};

  return (
    <>
      {cartItems.length ? (
        <Component container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Cart ({cartItems?.length})</Typography>
            </Header>
            {cartItems.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
            <BottomWrapper>
              <StyledButton onClick={() => buyNow()} variant="contained">
                Place Order
              </StyledButton>
            </BottomWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView price={price} totalItems={totalItems} />
          </Grid>
        </Component>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
