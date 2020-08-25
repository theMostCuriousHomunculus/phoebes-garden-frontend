import React from 'react';
import MUIButton from '@material-ui/core/Button';
import MUIFormControlLabel from '@material-ui/core/FormControlLabel';
import MUIGrid from '@material-ui/core/Grid';
import MUISwitch from '@material-ui/core/Switch';
import MUITextField from '@material-ui/core/TextField';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

// import { useRequest } from '../../hooks/request-hook';

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
  // const [succeeded, setSucceeded] = React.useState(false);
  const [error, setError] = React.useState(null);
  // const [processing, setProcessing] = React.useState('');
  // const [disabled, setDisabled] = React.useState(true);
  // const [clientSecret, setClientSecret] = React.useState('');
  const stripe = useStripe();
  const elements = useElements();

  // const { sendRequest } = useRequest();
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

  // React.useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   async function createPaymentIntent () {
  //     try {
  //       const responseData = await sendRequest(`${process.env.REACT_APP_BACKEDN_URL}/order`,
  //         'POST',
  //         {

  //         },
  //         {
  //           "Content-Type": "application/json"
  //         }
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }/create-payment-intent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
  //     })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       setClientSecret(data.clientSecret);
  //     });
  // }, []);

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      // Send the token to your server.
      stripeTokenHandler(result.token);
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
                name={pickup}
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
        <div className="card-errors" role="alert">{error}</div>
      </div>
      <MUIButton
        color="secondary"
        style={{ float: 'right', marginTop: 8 }}
        type="submit"
        variant="contained"
      >
        Submit Payment Via Stripe
      </MUIButton>
    </form>
  );
}

// Setup Stripe.js and the Elements provider
const stripePromise = loadStripe(`${process.env.STRIPE_TEST_PUBLISHABLE_KEY}`);

export default () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

// POST the token ID to your backend.
async function stripeTokenHandler(token) {
  const response = await fetch('/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: token.id})
  });

  return response.json();
}