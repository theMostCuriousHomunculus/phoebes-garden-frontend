import React from 'react';
import { useParams } from 'react-router-dom';
import MUITypography from '@material-ui/core/Typography';

function ViewProduct () {
  const productId = useParams().productId;

  return (
    <MUITypography variant="h1">This is the View Product Page.</MUITypography>
  );
}

export default ViewProduct;