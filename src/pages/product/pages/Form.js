import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, Box, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import * as actions from '../_redux/actions';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.string().required('Price is required'),
  stock: yup.string().required('Stock is required'),
  category: yup.string().required('Category is required'),
});

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [photoPrev, setPhotoPrev] = useState();
  const [photos, setPhoto] = useState();
  const [categoryData, setCategoryData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/product/category')
      .then((response) => {
        setCategoryData(response.data.product);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const { actionsLoading, data } = useSelector(
    (state) => ({
      actionsLoading: state.product.actionsLoading,
      data: state.product.data,
    }),
    shallowEqual
  );
  console.log('data', photos);
  const initialValues = {
    name: '',
    price: '',
    stock: '',
    category: '',
    photo: '',
  };
  const formik = useFormik({
    initialValues: data?.product || initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('values', values);
      handleSubmitForm(values);
      // Here you can perform any action with form data, like submitting to backend
    },
  });

  useEffect(() => {
    dispatch(actions.fetchItem(id));
  }, [id, dispatch]);

  const handleSubmitForm = (values) => {
    console.log('88888888', values.photo);
    setLoading(true);
    let newValues = {
      ...values,
    };
    if (id) {
      newValues = {
        id,
        ...values,
      };
      dispatch(actions.updateItem(newValues));
    } else {
      dispatch(actions.createItem(newValues));
    }
    setLoading(false);
    backToList();
  };
  const backToList = () => {
    navigate(-1);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
        <Link to="/product-list">
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Link>
      </Box>
      <div>
        <form onSubmit={formik.handleSubmit} style={{ padding: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="stock"
                name="stock"
                label="Stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {categoryData.map((categoryItem) => (
                    <MenuItem key={categoryItem} value={categoryItem}>
                      {categoryItem}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.category}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <TextField
                  fullWidth
                  id="photo"
                  name="photo"
                  label="Enter Photo Url"
                  value={formik.values.photo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.photo && Boolean(formik.errors.photo)}
                  helperText={formik.touched.photo && formik.errors.photo}
                />
                {formik.values.photo && <Avatar alt="img" src={formik.values.photo} sx={{ marginTop: '5px' }} />}
              </Box>
            </Grid>
          </Grid>

          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ marginTop: '20px' }}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Form;
