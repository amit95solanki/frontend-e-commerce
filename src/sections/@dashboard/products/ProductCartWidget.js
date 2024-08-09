import React, { useContext } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../../../pages/cart/cartSlice';
// component
import Iconify from '../../../components/iconify';
import AuthContext from '../../../context/AuthProvider';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const { user } = useContext(AuthContext);

  const items = useSelector(selectItems);
  return (
    <StyledRoot>
      {items.length > 0 && user ? (
        <Badge showZero badgeContent={items.length} color="error" max={99}>
          <Link to="/cart">
            <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
          </Link>
        </Badge>
      ) : (
        ''
      )}
    </StyledRoot>
  );
}
