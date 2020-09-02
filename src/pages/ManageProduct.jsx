import React from 'react';
import { useHistory } from 'react-router-dom';
import * as qs from 'query-string';
import MUIAddIcon from '@material-ui/icons/Add';
import MUIButton from '@material-ui/core/Button';
import MUICard from '@material-ui/core/Card';
import MUICardActions from '@material-ui/core/CardActions';
import MUICardContent from '@material-ui/core/CardContent';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUIInputAdornment from '@material-ui/core/InputAdornment';
import MUISyncIcon from '@material-ui/icons/Sync';
import MUITextField from '@material-ui/core/TextField';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LoadingSpinner from '../components/miscellaneous/LoadingSpinner';
import { AuthenticationContext } from '../contexts/authentication-context';
import { useRequest } from '../hooks/request-hook';

const useStyles = makeStyles({
  cardActions: {
    justifyContent: 'flex-end'
  },
  imagePickerContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  imagePreviewContainer: {
    alignItems: 'center',
    border: '2px black solid',
    display: 'flex',
    height: 184,
    justifyContent: 'center',
    margin: 8,
    width: 324
  },
  previewImage: {
    height: 180,
    objectFit: 'cover',
    width: 320
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  textField: {
    margin: '4px 0 4px 0'
  }
});

function ManageProduct () {

  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const history = useHistory();
  const productId = qs.parse(window.location.search, { ignoreQueryPrefix: true }).productId;
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState();
  const imageInputRef = React.useRef();
  const [name, setName] = React.useState('');
  const [previewURL, setPreviewURL] = React.useState();
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const { loading, sendRequest } = useRequest();

  React.useEffect(() => {
    const fetchProduct = async function () {
      try {
        const productData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/product/${productId}`, 'GET', null, {});
        setDescription(productData.description);
        setPreviewURL(productData.image);
        setName(productData.name);
        setPrice(productData.price);
        setQuantity(productData.quantity);
      } catch (error) {
        console.log(error);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId, sendRequest]);

  React.useEffect(() => {
    if (image) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewURL(fileReader.result);
      };
      fileReader.readAsDataURL(image);
    }
  }, [image]);

  function changeImageHandler (event) {
    if (event.target.files && event.target.files.length === 1) {
      setImage(event.target.files[0]);
    }
  }

  async function submitProduct () {
    const requestInfo = productId ?
      {
        method: 'PATCH',
        urlSuffix: '/' + productId
      } :
      {
        method: 'POST',
        urlSuffix: ''
      };

    try {
      const formData = new FormData();
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }
      formData.append('name', name);
      formData.append('price', price);
      formData.append('quantity', quantity);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/product${requestInfo.urlSuffix}`,
        requestInfo.method,
        formData,
        {
          Authorization: 'Bearer ' + authentication.token
        }
      );
      history.push('/products');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      {loading ?
        <LoadingSpinner /> :
        <MUICard>
          <MUICardHeader
            title={<MUITypography color="secondary" variant="h2">{productId ? "Manage Product" : "New Product"}</MUITypography>}
          >
          </MUICardHeader>
          <MUICardContent>
            <MUITextField
              className={classes.textField}
              color="secondary"
              fullWidth={true}
              label="Product Name"
              onChange={(event) => setName(event.target.value)}
              required={true}
              type="text"
              value={name}
              variant="outlined"
            />
            <div className={classes.imagePickerContainer}>
              <input
                accept=".jpg,.png,.jpeg"
                onChange={changeImageHandler}
                ref={imageInputRef}
                style={{ display: 'none' }}
                type="file"
              />
              <MUIButton
                color="secondary"
                onClick={() => imageInputRef.current.click()}
                style={{ marginTop: 4 }}
                variant="contained"
              >
                Upload Image
              </MUIButton>
              <div className={classes.imagePreviewContainer}>
                {previewURL ?
                  <img alt="Preview" className={classes.previewImage} src={previewURL} /> :
                  <MUITypography variant="body1">Please Pick an Image.</MUITypography>
                }
              </div>
            </div>
            <MUITextField
              className={classes.textField}
              color="secondary"
              fullWidth={true}
              label="Product Description"
              onChange={(event) => setDescription(event.target.value)}
              multiline
              rows={5}
              value={description}
              variant="outlined"
            />
            <div className={classes.spaceBetween}>
              <MUITextField
                className={classes.textField}
                color="secondary"
                inputProps={{ min: 0, step: 0.01 }}
                InputProps={{ startAdornment: <MUIInputAdornment position="start">$</MUIInputAdornment> }}
                label="Price"
                onChange={(event) => setPrice(event.target.value)}
                required={true}
                type="number"
                value={price}
                variant="outlined"
              />
              <MUITextField
                className={classes.textField}
                color="secondary"
                inputProps={{ min: 0, step: 1 }}
                label="Quantity"
                onChange={(event) => setQuantity(event.target.value)}
                required={true}
                type="number"
                value={quantity}
                variant="outlined"
              />
            </div>
          </MUICardContent>
          <MUICardActions className={classes.cardActions}>
            <MUIButton color="secondary" onClick={submitProduct} variant="contained">
              {productId ? <MUISyncIcon /> : <MUIAddIcon />}
              
            </MUIButton>
          </MUICardActions>
        </MUICard>
      }
    </React.Fragment>
  );
}

export default ManageProduct;