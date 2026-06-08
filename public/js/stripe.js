import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51TfxV8FVYJrVVd94TyoDQpEH67zy12yvmYf9njEJww15VeAPu6LHsJmXrlADezeNl8eZTPocBJB2FbUzLcDojsi400DCaIaUhc',
);

export const bookTour = async tourId => {
  try {
    const session = await axios.get(
      `/api/v1/booking/checkout-session/${tourId}`,
    );

    const result = await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    if (result.error) {
      showAlert('error', result.error.message);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
