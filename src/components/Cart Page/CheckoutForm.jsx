import React from 'react';
import MUIButton from '@material-ui/core/Button';
import MUICircularProgress from '@material-ui/core/CircularProgress';
import MUIFormControlLabel from '@material-ui/core/FormControlLabel';
import MUIGrid from '@material-ui/core/Grid';
import MUISwitch from '@material-ui/core/Switch';
import MUITextField from '@material-ui/core/TextField';
import MUITypography from '@material-ui/core/Typography';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as actions from '../../redux/actions';
import { useRequest } from '../../hooks/request-hook';

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Roboto", Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  },
  hidePostalCode: true
};

const CheckoutForm = () => {
  const cart = useSelector(state => state.cart);
  const [succeeded, setSucceeded] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [processing, setProcessing] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const { sendRequest } = useRequest();
  const [pickup, setPickup] = React.useState(true);
  const cityInput = React.useRef(null);
  const emailAddressInput = React.useRef(null);
  const firstNameInput = React.useRef(null);
  const lastNameInput = React.useRef(null);
  const noteInput = React.useRef(null);
  const phoneNumberInput = React.useRef(null);
  const stateInput = React.useRef(null);
  const streetAddressInput = React.useRef(null);
  const zipInput = React.useRef(null);

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function createPaymentIntent () {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/create-payment-intent`,
          'POST',
          JSON.stringify({ items: cart.map(x => ({ _id: x.productId, quantity: parseInt(x.chosenQuantity) }))}),
          {
            "Content-Type": "application/json"
          }
        );
        setClientSecret(responseData.clientSecret);
      } catch (err) {
        console.log(err);
      }
    }
    createPaymentIntent();
  }, [cart, sendRequest]);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        billing_details: {
          address: {
            city: cityInput.current.value,
            country: 'US',
            line1: streetAddressInput.current.value,
            line2: null,
            postal_code: zipInput.current.value,
            state: stateInput.current.value
          },
          email: emailAddressInput.current.value,
          name: `${firstNameInput.current.value} ${lastNameInput.current.value}`,
          phone: phoneNumberInput.current.value
        },
        card: elements.getElement(CardElement)
      },
      receipt_email: emailAddressInput.current.value
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(function () {
        localStorage.clear();
        dispatch(actions.initializeStore());
        history.push('/');
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <MUIGrid container spacing={1} style={{ marginBottom: 8 }}>
        <MUIGrid item xs={12} md={6}>
          <MUITextField
            color="secondary"
            fullWidth
            inputRef={firstNameInput}
            label="First Name"
            name="first_name"
            type="text"
            variant="outlined"
          />
        </MUIGrid>
        <MUIGrid item xs={12} md={6}>
          <MUITextField
            color="secondary"
            fullWidth
            inputRef={lastNameInput}
            label="Last Name"
            name="last_name"
            type="text"
            variant="outlined"
          />
        </MUIGrid>
        <MUIGrid item xs={12} md={6}>
          <MUITextField
            color="secondary"
            fullWidth
            inputRef={emailAddressInput}
            label="Email Address"
            name="email_address"
            required={true}
            type="email"
            variant="outlined"
          />
        </MUIGrid>
        <MUIGrid item xs={12} md={6}>
          <MUITextField
            color="secondary"
            fullWidth
            inputRef={phoneNumberInput}
            label="Phone Number"
            name="phone_number"
            type="tel"
            variant="outlined"
          />
        </MUIGrid>
        <MUIGrid item xs={12}>
          <MUITextField
            color="secondary"
            fullWidth
            inputRef={streetAddressInput}
            label="Street Address"
            name="street_address"
            required={!pickup}
            style={{ display: pickup ? 'none' : 'block' }}
            type="text"
            variant="outlined"
          />
        </MUIGrid>
        <MUIGrid item xs={12} md={6}>
          <MUITextField
            color="secondary"
            fullWidth
            inputRef={cityInput}
            label="City"
            name="city"
            required={!pickup}
            style={{ display: pickup ? 'none' : 'block' }}
            type="text"
            variant="outlined"
          />
        </MUIGrid>
        <MUIGrid item xs={12} md={3}>
          <MUITextField
            color="secondary"
            fullWidth
            inputRef={stateInput}
            label="State"
            name="state"
            required={!pickup}
            style={{ display: pickup ? 'none' : 'block' }}
            type="text"
            variant="outlined"
          />
        </MUIGrid>
        <MUIGrid item xs={12} md={3}>
          <MUITextField
            color="secondary"
            fullWidth
            inputProps={{ inputMode: "numeric" }}
            inputRef={zipInput}
            label="Zipcode"
            name="zip"
            required={!pickup}
            style={{ display: pickup ? 'none' : 'block' }}
            type="text"
            variant="outlined"
          />
        </MUIGrid>
        <MUIGrid item xs={12}>
          <MUITextField
            color="secondary"
            fullWidth
            inputRef={noteInput}
            label="Delivery Instructions"
            name="note"
            multiline
            rows={4}
            style={{ display: pickup ? 'none' : 'block' }}
            type="text"
            variant="outlined"
          />
        </MUIGrid>
        <MUIGrid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>              
          <MUIFormControlLabel
            control={
              <MUISwitch
                checked={!pickup}
                onChange={() => setPickup(currentState => !currentState)}
                name="method"
              />
            }
            label={pickup ? 'Pickup' : 'Delivery'}
          />
        </MUIGrid>
      </MUIGrid>

      <div className="form-row">
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
        {error && <MUITypography color="error" variant="body1">{error}</MUITypography>}
        {succeeded && <MUITypography color="secondary" variant="body1">Payment was successful; thank you for your business!</MUITypography>}
      </div>
      <MUIButton
        color="secondary"
        disabled={processing || disabled || succeeded}
        style={{ float: 'right', marginTop: 8 }}
        type="submit"
        variant="contained"
      >
        {processing ? <MUICircularProgress color="primary" size={24} /> : 'Submit Payment Via Stripe'}
      </MUIButton>
    </form>
  );
}

// Setup Stripe.js and the Elements provider
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

export default () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

// POST the token ID to your backend.
// async function stripeTokenHandler(token) {
//   const response = await fetch('/charge', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({token: token.id})
//   });

//   return response.json();
// }