import React from 'react';
import { useHistory } from 'react-router-dom';
import MUIButton from '@material-ui/core/Button';
import MUICard from '@material-ui/core/Card';
import MUICardActions from '@material-ui/core/CardActions';
import MUICardContent from '@material-ui/core/CardContent';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUICardMedia from '@material-ui/core/CardMedia';
import MUIGrid from '@material-ui/core/Grid';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import * as actions from '../redux/actions';
import LoadingSpinner from '../components/miscellaneous/LoadingSpinner';
import theme from '../theme';
import { AuthenticationContext } from '../contexts/authentication-context';
import { useRequest } from '../hooks/request-hook';

const useStyles = makeStyles({
  cardActions: {
    justifyContent: 'flex-end'
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  gridContainer: {
    margin: 0,
    width: '100%'
  },
  warningButton: {
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  }
});

function Products () {

  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [productState, setProductState] = React.useState([]);
  const { loading, sendRequest } = useRequest();

  const fetchProducts = React.useCallback(
    async function () {
      try {
        const productData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/product`, 'GET', null, {});
        setProductState(productData);
      } catch (error) {
        console.log(error);
      }
    },
    [sendRequest]
  );

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts, sendRequest]);

  // this needs updated to incorporate redux
  function addToCart (productId) {
    let currentQuantity = parseInt(localStorage.getItem(productId), 10);
    localStorage.setItem(productId, currentQuantity ? currentQuantity + 1 : 1);
    dispatch(actions.initializeStore());
  }

  async function deleteProductHandler (productId) {
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/product/${productId}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + authentication.token
        }
      );
    } catch (error) {
      console.log(error);
    }
    fetchProducts();
  }

  return (
    <React.Fragment>
      {loading ?
        <LoadingSpinner /> :
        <React.Fragment>
          <MUIGrid className={classes.gridContainer} container spacing={2}>
            {productState.map(function (product) {
              return (
                <MUIGrid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <MUICard>
                    <MUICardHeader
                      title={<MUITypography color="secondary" variant="h2">{product.name}</MUITypography>}
                      subheader={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <MUITypography variant="subtitle1">${product.price}</MUITypography>
                          <MUITypography variant="subtitle1">{product.quantity} in stock</MUITypography>
                        </div>
                      }
                    />
                    <MUICardMedia
                      className={classes.cardMedia}
                      image={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
                      title={product.name}
                    />
                    <MUICardContent>
                      <MUITypography variant="body2">{product.description}</MUITypography>
                    </MUICardContent>
                    <MUICardActions className={classes.cardActions}>
                      {authentication.isLoggedIn ?
                        <React.Fragment>
                          <MUIButton
                            color="secondary"
                            onClick={() => history.push(`/manage-product?productId=${product._id}`)}
                            variant="contained"
                          >
                            Manage Product
                          </MUIButton>
                          <MUIButton
                            className={classes.warningButton}
                            onClick={deleteProductHandler.bind(this, product._id)}
                            variant="contained"
                          >
                            Delete Product
                          </MUIButton>
                        </React.Fragment> :
                        <MUIButton
                          color="secondary"
                          disabled={product.quantity === 0}
                          onClick={addToCart.bind(this, product._id)}
                          variant="contained"
                        >
                          {product.quantity === 0 ?
                            'Out of Stock :-(' :
                            'Add to Cart'
                          }
                        </MUIButton>
                      }
                    </MUICardActions>
                  </MUICard>
                </MUIGrid>
              );
            })}
          </MUIGrid>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default Products;