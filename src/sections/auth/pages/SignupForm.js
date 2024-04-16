import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// @mui
import {
  FormHelperText,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { register } from '../../../pages/auth/core/_request';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const validationSchema = yup.object({
  firstName: yup.string().required('Name is required'),
  lastName: yup.string().required('Price is required'),
  email: yup.string().required('Stock is required'),
  password: yup.string().required('Category is required'),
  dob: yup.string().required('Photo is required'),
  gender: yup.string().required('Gender is required').oneOf(['male', 'female'], 'Invalid gender'),
});

export default function SignupForm() {
  const navigate = useNavigate();
  const { emails } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: emails,
      password: '',
      dob: '',
      gender: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const newUser = values;
      console.log('newUser', newUser);
      register(newUser);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Name"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            id="dob"
            name="dob"
            type="date"
            label="Date Of Birth"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControl component="fieldset" error={formik.touched.gender && Boolean(formik.errors.gender)}>
            <RadioGroup
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              row
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            {formik.touched.gender && formik.errors.gender ? (
              <FormHelperText>{formik.errors.gender}</FormHelperText>
            ) : null}
          </FormControl>
          {/* <Link variant="subtitle2" underline="hover">
            Verify Email
          </Link> */}
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}
