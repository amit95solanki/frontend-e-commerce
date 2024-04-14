import { useState } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm';

// import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: '40%',
  padding: '40px 0 0 80px',
  [theme.breakpoints.down('md')]: {
    padding: '20px 40px',
  },
}));

const Image = styled('img')({
  padding: '15px 20px',
  border: '1px solid #f0f0f0',
  width: '95%',
});

const StyledButton = styled(Button)`
  width: 46%;
  border-radius: 2px;
  height: 50px;
  color: #fff;
`;

const ActionItem = ({ product, handleCart }) => {
  const navigate = useNavigate();
  const { id } = product;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  //   const buyNow = async () => {
  //     let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com' });
  //     var information = {
  //       action: 'https://securegw-stage.paytm.in/order/process',
  //       params: response,
  //     };
  //     post(information);
  //   };

  return (
    <LeftContainer>
      <Image src={product?.photo} />
      <br />
      <StyledButton
        style={{ marginRight: 10, background: '#ff9f00' }}
        variant="contained"
        disabled={product?.stock === 0}
        onClick={() => handleCart(product)}
      >
        <Cart />
        {product?.stock === 0 ? <span style={{ color: 'red' }}>out of stock</span> : <span> Add to Cart</span>}
      </StyledButton>
      <StyledButton style={{ background: '#fb641b' }} variant="contained">
        <Flash /> Buy Now
      </StyledButton>
    </LeftContainer>
  );
};

export default ActionItem;
