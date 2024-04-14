import React, { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useDispatch } from 'react-redux';
// import GroupButton from './GroupButton';
import { deleteItemFromCartAsync, updateCartAsync } from '../cartSlice';

const Component = styled(Card)`
  border-top: 1px solid #f0f0f0;
  border-radius: 0px;
  display: flex;
`;

const LeftComponent = styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-top: 10px;
`;

const Cost = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const MRP = styled(Typography)`
  color: #878787;
`;

const Discount = styled(Typography)`
  color: #388e3c;
`;

const Remove = styled(Button)`
  //   margin-top: 20px;
  font-size: 16px;
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  console.log('item', item?.product?._id);
  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleQuantity = (e, itemId) => {
    const quantity = parseInt(e.target.value, 10);
    dispatch(updateCartAsync({ id: itemId, quantity }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Component>
      <LeftComponent>
        <img src={item?.product?.photo} alt="img" style={{ height: 110, width: 110 }} />
        {/* <GroupButton /> */}
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
          <select id="select" onChange={(e) => handleQuantity(e, item?._id)} value={item?.quantity}>
            <option value="">Quantity</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Box>
      </LeftComponent>
      <Box style={{ margin: 20 }}>
        {/* <Typography>{addEllipsis(item.title.longTitle)}</Typography> */}
        <SmallText>
          Seller:RetailNet
          <span>
            <img src={item?.product?.photo} alt="img" style={{ width: 50, marginLeft: 10 }} />
          </span>
        </SmallText>
        <Typography style={{ margin: '20px 0' }}>
          <Cost component="span">₹{item?.product?.price}</Cost>&nbsp;&nbsp;&nbsp;
          {/* <MRP component="span">
            <strike>₹{item.price}</strike>
          </MRP>
          &nbsp;&nbsp;&nbsp; */}
          {/* <Discount component="span">{item?.product?.price} off</Discount> */}
        </Typography>
        <Remove onClick={handleClickOpen}>Remove</Remove>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              handleRemove(e, item._id);
              handleClose();
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Component>
  );
};

export default CartItem;
