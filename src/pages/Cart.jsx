import React from 'react';
import MUICard from '@material-ui/core/Card';
import MUICardActions from '@material-ui/core/CardActions';
import MUITable from '@material-ui/core/Table';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableCell from '@material-ui/core/TableCell';
import MUITableContainer from '@material-ui/core/TableContainer';
import MUITableFooter from '@material-ui/core/TableFooter';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableRow from '@material-ui/core/TableRow';
import MUITypography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import CartTableRow from '../components/Cart Page/CartTableRow';
import CheckoutForm from '../components/Cart Page/CheckoutForm';
import theme from '../theme';
import LoadingSpinner from '../components/miscellaneous/LoadingSpinner';

const useStyles = makeStyles({
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  table: {
    minWidth: 650
  },
  tableContainer: {
    maxHeight: '80vh'
  },
  tableHead: {
    '& *': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    }
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  textAlignRight: {
    textAlign: 'right'
  }
});

function Cart () {

  const classes = useStyles();
  const cart = useSelector(state => state.cart);

  return (
    <React.Fragment>
      {!cart ?
        <LoadingSpinner /> :
        <React.Fragment>
          <MUICard>
            <MUITableContainer className={classes.tableContainer}>
              <MUITable className={classes.table} stickyHeader>
                <MUITableHead className={classes.tableHead}>
                  <MUITableRow>
                    <MUITableCell className={classes.textAlignCenter}>
                      <MUITypography variant="h4">
                        Item
                      </MUITypography>
                    </MUITableCell>
                    <MUITableCell className={classes.textAlignCenter}>
                      <MUITypography variant="h4">
                        Description
                      </MUITypography>
                    </MUITableCell>
                    <MUITableCell className={classes.textAlignCenter}>
                      <MUITypography variant="h4">
                        Price
                      </MUITypography>
                    </MUITableCell>
                    <MUITableCell className={classes.textAlignCenter}>
                      <MUITypography variant="h4">
                        Quantity
                      </MUITypography>
                    </MUITableCell>
                    <MUITableCell className={classes.textAlignCenter}>
                      <MUITypography variant="h4">
                        Subtotal
                      </MUITypography>
                    </MUITableCell>
                  </MUITableRow>
                </MUITableHead>
                <MUITableBody className={classes.tableBody}>
                  {cart.map(function (product) {
                    return (
                      <CartTableRow
                        key={product.productId}
                        productId={product.productId}
                      />
                    );
                  })}
                </MUITableBody>
                <MUITableFooter>
                  <MUITableRow>
                    <MUITableCell className={classes.textAlignCenter}></MUITableCell>
                    <MUITableCell className={classes.textAlignCenter}></MUITableCell>
                    <MUITableCell className={classes.textAlignCenter}></MUITableCell>
                    <MUITableCell className={classes.textAlignRight}>
                      <MUITypography variant="body1">
                        Grand Total:
                      </MUITypography>
                    </MUITableCell>
                    <MUITableCell className={classes.textAlignCenter}>
                      <MUITypography variant="body1">
                        ${Math.round(cart.reduce(function (a, c) {
                          return a + c.chosenQuantity * c.price;
                        }, 0) * 100) / 100}
                      </MUITypography>
                    </MUITableCell>
                  </MUITableRow>
                </MUITableFooter>
              </MUITable>
            </MUITableContainer>
            <MUICardActions className={classes.cardActions}>
              <CheckoutForm />
            </MUICardActions>
          </MUICard>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default Cart;