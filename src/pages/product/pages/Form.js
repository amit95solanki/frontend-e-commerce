import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.string().required('Price is required'),
  stock: yup.string().required('Stock is required'),
  category: yup.string().required('Category is required'),
  photo: yup.string().required('Photo is required'),
});

const Form = () => {
  const [photoPrev, setPhotoPrev] = useState();
  const [photos, setPhoto] = useState();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      stock: '',
      category: '',
      photo: photos ?? '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values);
      // Here you can perform any action with form data, like submitting to backend
    },
  });

  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotoPrev(reader.result);
          setPhoto(file);
          formik.setFieldValue('photo', file); // Set the photo field value in formik
        }
      };
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.category}</div>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div style={{ border: '1px solid gray', padding: '4px', margin: '20px' }}>
              <input required type="file" onChange={changeImageHandler} />
            </div>
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
