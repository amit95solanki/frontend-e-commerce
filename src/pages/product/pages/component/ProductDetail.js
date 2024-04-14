import { Box, Typography, Table, TableBody, TableRow, TableCell, styled } from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material';

const SmallText = styled(Box)`
  font-size: 14px;
  vertical-align: baseline;
  & > p {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const ColumnText = styled(TableRow)`
  font-size: 14px;
  vertical-align: baseline;
  & > td {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const StyledBadge = styled(Badge)`
  margin-right: 10px;
  color: #00cc00;
  font-size: 15px;
`;

const ProductDetail = ({ product }) => {
  const adURL = 'https://cdn2.vectorstock.com/i/1000x1000/66/21/assured-rubber-stamp-vector-17186621.jpg';
  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

  return (
    <>
      <Typography>Available offers</Typography>
      <SmallText>
        <Typography>
          <StyledBadge />
          Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card
        </Typography>
        <Typography>
          <StyledBadge />
          Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply
        </Typography>
        <Typography>
          <StyledBadge />
          Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs
        </Typography>
        <Typography>
          <StyledBadge />
          Partner OfferExtra 10% off upto ₹500 on next furniture purchase
        </Typography>
      </SmallText>
      <Table>
        <TableBody>
          <ColumnText>
            <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
            <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ₹40</TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
            <TableCell>No Warranty</TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell style={{ color: '#878787' }}>Seller</TableCell>
            <TableCell>
              <span style={{ color: '#2874f0' }}>SuperComNet</span>
              <Typography>GST invoice available</Typography>
              <Typography>View more sellers starting from ₹329</Typography>
            </TableCell>
          </ColumnText>
          <TableRow>
            <TableCell colSpan={2}>
              <img src={adURL} alt="img" style={{ width: '50px' }} />
            </TableCell>
          </TableRow>
          <ColumnText>
            <TableCell style={{ color: '#878787' }}>Description</TableCell>
            <TableCell>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dicta laudantium doloribus? Similique vel
              officiis quidem accusantium id necessitatibus, dolore ab debitis iure voluptatum beatae consectetur
              dignissimos tenetur.
            </TableCell>
          </ColumnText>
        </TableBody>
      </Table>
    </>
  );
};

export default ProductDetail;
