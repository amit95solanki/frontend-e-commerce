import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  styled,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, selectItems, updateCartAsync } from '../../cart/_redux/cartSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const params = useParams();

  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = React.useState(false);
  // In the first useEffect
  useEffect(() => {
    // const calculatedTotalAmount = items.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
    const calculatedTotalItems = items.reduce((total, item) => item.quantity + total, 0);

    setTotalItems(calculatedTotalItems);
  }, [items]);

  const calculatedTotalAmount = () => {
    const totalPrice = items.reduce((total, item) => {
      return item.product.price * item.quantity + total;
    }, 0);
    setTotalAmount(totalPrice);
  };

  // Ensure that the items array is correctly updated after removing an item
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id))
      .then(() => {
        // You can perform additional actions after the item is successfully removed
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };

  // Ensure that the quantity change is reflected immediately
  const handleQuantity = (e, itemId) => {
    const quantity = parseInt(e.target.value, 10);
    dispatch(updateCartAsync({ id: itemId, quantity }))
      .then(() => {
        // You can perform additional actions after the quantity is successfully updated
        calculatedTotalAmount(); // Recalculate total amount
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };

  useEffect(() => {
    calculatedTotalAmount();
  }, [items, handleQuantity]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {items.length > 0 &&
              items.map((item, index) => (
                <Item key={item._id + index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '0px 20px' }}>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                      <img src={`${item?.product?.photo}`} alt="img" height={'50px'} width={'50px'} />
                      <Stack direction="column" spacing={0}>
                        <Box>{item?.product?.name}</Box>
                        <div>
                          <select id="select" onChange={(e) => handleQuantity(e, item._id)} value={item.quantity}>
                            <option value="">Quantity</option>
                            {[1, 2, 3, 4, 5].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box>
                        <span>Price </span>
                        {item?.product?.price}
                      </Box>
                      {/* <Box
                        sx={{ color: 'red', textAlign: 'end', cursor: 'pointer' }}
                        onClick={(e) => handleRemove(e, item._id)}
                      >
                        Remove
                      </Box> */}
                      <Button variant="outlined" color="error" onClick={handleClickOpen}>
                        Remove
                      </Button>
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
                    </Box>
                  </Box>
                </Item>
              ))}
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography sx={{ textAlign: 'center' }}>Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0px' }}>
                <Typography>Total Items in Cart</Typography>
                <Typography>:</Typography>
                <Typography>{totalItems} items</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0px' }}>
                <Typography>Total Amount</Typography>
                <Typography>:</Typography>
                <Typography>{totalAmount}</Typography>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CartPage;
