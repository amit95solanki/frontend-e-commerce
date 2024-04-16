import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
// @mui
import { Stack, TextField, Box, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// ----------------------------------------------------------------------

const validationSchema = yup.object({
  email: yup.string().required('Stock is required'),
});

const EmailVerify = () => {
  const [open, setOpen] = useState(false);

  const postData = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/email-verify', values);
      setOpen(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      postData(values);
    },
  });
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
          <Stack direction={'column'} spacing={2}>
            {open ? (
              <Alert icon={false} severity="success">
                Please check your email .
              </Alert>
            ) : (
              <TextField
                sx={{ width: '50ch' }}
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            )}

            {open ? (
              ''
            ) : (
              <LoadingButton sx={{ m: 1, width: '50ch' }} size="large" type="submit" variant="contained">
                send
              </LoadingButton>
            )}
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default EmailVerify;
