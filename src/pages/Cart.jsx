import React from 'react';
import MUICard from '@material-ui/core/Card';
import MUITable from '@material-ui/core/Table';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableCell from '@material-ui/core/TableCell';
import MUITableContainer from '@material-ui/core/TableContainer';
import MUITableFooter from '@material-ui/core/TableFooter';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableRow from '@material-ui/core/TableRow';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CartTableRow from '../components/Cart Page/CartTableRow';
import LoadingSpinner from '../components/miscellaneous/LoadingSpinner';
import theme from '../theme';
import { useRequest } from '../hooks/request-hook';

const useStyles = makeStyles({
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
  const [cart, setCart] = React.useState([]);
  const { loading, sendRequest } = useRequest();

  React.useEffect(function () {
    async function fetchCartInfo () {
      const cartCopy = [];
      let productId;
      let chosenQuantity;
      for (let i = 0; localStorage.key(i); i++) {
        productId = localStorage.key(i);
        chosenQuantity = localStorage.getItem(productId);
        cartCopy.push({
          productId,
          chosenQuantity
        });
      }
      const productData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/product?_id=${cartCopy.map(item => item.productId).join(',')}`,
        'GET',
        null,
        {}
      );
      for (let product of productData) {
        const item = cartCopy.find(x => x.productId === product._id);
        item.availableQuantity = product.quantity;
        item.description = product.description;
        item.image = product.image;
        item.name = product.name;
        item.price = product.price;
      }
      setCart(cartCopy);
    }
    fetchCartInfo();
  }, [sendRequest]);

  function changeChosenQuantity (newQuantity, productId) {
    const cartCopy = [...cart];
    const index = cartCopy.findIndex(function (item) {
      return item.productId === productId;
    });
    cartCopy[index].chosenQuantity = newQuantity;
    localStorage.setItem(productId, newQuantity);
    setCart(cartCopy);
  }

  function removeProductFromCart (productId) {
    setCart(function (currentCartState) {
      return currentCartState.filter(function (item) {
        return item.productId !== productId;
      })
    });
    localStorage.removeItem(productId);
  }

  return (
    <React.Fragment>
      {loading ?
        <LoadingSpinner /> :
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
                      changeChosenQuantity={changeChosenQuantity}
                      key={product.productId}
                      product={product}
                      removeProductFromCart={removeProductFromCart}
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
                      ${cart.reduce(function (a, c) {
                        return a + c.chosenQuantity * c.price;
                      }, 0)}
                    </MUITypography>
                  </MUITableCell>
                </MUITableRow>
              </MUITableFooter>
            </MUITable>
          </MUITableContainer>
        </MUICard>
      }
    </React.Fragment>
  );
}

export default Cart;