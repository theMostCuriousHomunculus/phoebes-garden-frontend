import React from 'react';
import MUIButton from '@material-ui/core/Button';
import MUICard from '@material-ui/core/Card';
import MUICardMedia from '@material-ui/core/CardMedia';
import MUIDeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MUITableCell from '@material-ui/core/TableCell';
import MUITableRow from '@material-ui/core/TableRow';
import MUITextField from '@material-ui/core/TextField';
import MUITypography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import * as actions from '../../redux/actions';
import theme from '../../theme';

const useStyles = makeStyles({
  card: {
    margin: '8px 8px 8px 4px',
    width: 96
  },
  cardMedia: {
    height: 54,
    width: 96
    // paddingTop: '56.25%', // 16:9
  },
  flexRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  quantityInput: {
    marginRight: 8,
    minWidth: 80
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  table: {
    minWidth: 650
  },
  tableCell: {
    padding: '0 4px'
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

function CartTableRow (props) {
  const classes = useStyles();
  const product = useSelector(state => state.cart.find(item => item.productId === props.productId));
  const dispatch = useDispatch();

  return (
    <MUITableRow>
      <MUITableCell className={classes.tableCell}>
        <div className={`${classes.flexRow} ${classes.spaceBetween}`}>
          <MUICard className={classes.card}>
            <MUICardMedia
              className={classes.cardMedia}
              image={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
              title={product.name}
            />
          </MUICard>
          <MUITypography variant="body1">{product.name}</MUITypography>
        </div>
      </MUITableCell>
      <MUITableCell className={`${classes.tableCell} ${classes.textAlignRight}`}>
        <MUITypography variant="body1">{product.description}</MUITypography>
      </MUITableCell>
      <MUITableCell className={`${classes.tableCell} ${classes.textAlignCenter}`}>
        <MUITypography variant="body1">${product.price}</MUITypography>
      </MUITableCell>
      <MUITableCell className={classes.tableCell}>
        <div className={`${classes.flexRow} ${classes.spaceAround}`}>
          <div className={classes.flexRow}>
            <MUITextField
              className={classes.quantityInput}
              inputProps={{ max: product.availableQuantity, min: 1, step: 1 }}
              margin="dense"
              onChange={(event) => dispatch(actions.changeQuantity(props.productId, event.target.value))}
              type="number"
              value={product.chosenQuantity}
              variant="outlined"
            />
            <MUITypography variant="body1"> / {product.availableQuantity}</MUITypography>
          </div>
          <MUIButton
            color="secondary"
            onClick={() => dispatch(actions.removeProduct(props.productId))}
            variant="contained"
          >
            <MUIDeleteForeverIcon />
          </MUIButton>
        </div>
      </MUITableCell>
      <MUITableCell className={`${classes.tableCell} ${classes.textAlignCenter}`}>
        <MUITypography variant="body1">${product.chosenQuantity * product.price}</MUITypography>
      </MUITableCell>
    </MUITableRow>
  );
}

export default CartTableRow;