import { useState, useEffect } from 'react';

import { Box, Typography, styled } from '@mui/material';

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  borderbottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
  color: #878787;
`;

const Container = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  & > p {
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

const Price = styled(Typography)`
  float: right;
`;

const TotalAmount = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  border-top: 1px dashed #e0e0e0;
  padding: 20px 0;
  border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
  font-size: 16px;
  color: green;
`;

// component: {
//     // width: '30%'
// },

const TotalView = ({ cartItems }) => {
  const [price, setPrice] = useState(0);

  const [totalItems, setTotalItems] = useState(0);

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

  return (
    <Box>
      {' '}
      {/* className={classes.component}> */}
      <Header>
        <Heading>PRICE DETAILS</Heading>
      </Header>
      <Container>
        <Typography>
          Total Item
          <Price component="span">{totalItems}</Price>
        </Typography>
        <Typography>
          Price
          <Price component="span">₹{price}</Price>
        </Typography>

        <Typography>
          Delivery Charges
          <Price component="span">₹40</Price>
        </Typography>
        <TotalAmount>
          Total Amount
          <Price>₹{price + 40}</Price>
        </TotalAmount>
        {/* <Discount>You will save ₹{discount - 40} on this order</Discount> */}
      </Container>
    </Box>
  );
};

export default TotalView;
