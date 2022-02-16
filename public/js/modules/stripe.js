import showAlert from './alertMessages.js';
import checkBookingStatus from './checkBookingStatus.js';
import handlerApiRequests from './handleApiRequests.js';
import showModal from './showModal.js';

const stripe = Stripe(
  'pk_test_51Hkl5QJQ1ItsLe4ZRdUjwYoxOjenFqz9r8UL7I0lnCo8jhfBwkCKmy82Zpu9YHuxMzo6SvuxtriIlGIXhWkL2bK600DsMvzd0j'
);

// Stripe Payment Haldling
const stripeCheckout = async function () {
  try {
    // Set button value
    this.textContent = 'Processing Payment...';

    // Get Tour Id & Stripe Key
    const { tourId, stripePublicKey, modalLayout } = this.dataset;

    // Get the session
    const url = `/api/v1/bookings/checkout-session/${tourId}`;
    const resp = await handlerApiRequests({ url });

    // Actions bases on the user response
    if (resp.data.tourIsOpen && resp.data.tourIsBooked) return showModal();

    // Handle the checkout session
    const stripe = Stripe(stripePublicKey);

    await stripe.redirectToCheckout({
      sessionId: resp.data.session.id,
    });
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

export default stripeCheckout;
