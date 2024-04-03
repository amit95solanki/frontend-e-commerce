import * as React from 'react';
import { useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  styled,
  Stack,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../../cart/_redux/cartSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProductDatailPage = () => {
  const [selectedColor, setSelectedColor] = React.useState();
  const [selectedSize, setSelectedSize] = useState();
  const items = useSelector(selectItems);
  // const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  // const alert = useAlert();
  // const status = useSelector(selectProductListStatus);

  const handleCart = (e) => {
    e.preventDefault();
    // if (items.findIndex((item) => item.product.id === product.id) < 0) {
    //   console.log({ items, product });
    //   const newItem = {
    //     product: product.id,
    //     quantity: 1,
    //   };
    // if (selectedColor) {
    //   newItem.color = selectedColor;
    // }
    // if (selectedSize) {
    //   newItem.size = selectedSize;
    // }
    //   dispatch(addToCartAsync({ item: newItem, alert }));
    // } else {
    //   alert.error('Item Already added');
    // }
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const navigate = useNavigate();
  return (
    <>
      {/* <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
        <Button variant="contained" sx={{ width: '150px' }} onClick={() => navigate('/products')}>
          Back
        </Button>
      </div> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography sx={{ textAlign: 'center' }}>Lorem, ipsum dolor.</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0px' }}>
                <Typography>Price</Typography>
                <Typography>:</Typography>
                <Typography>Rs 15000</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0px' }}>
                <Typography>Price</Typography>
                <Typography>:</Typography>
                <Typography>Rs 15000</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'end', margin: '10px 0px' }}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Quantity</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDatailPage;
