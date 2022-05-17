import { asyncErrorWrapper } from '../utils/handleErrors';
import httpRequestHelper, {
  handleHttpErrors,
} from '../utils/httpRequestsHelper';

const checkoutWithStripe = async (tourId, stripePublicKey) => {
  return asyncErrorWrapper(async () => {
    const stripe = Stripe(stripePublicKey);

    /// Get stripe checkout sessions
    const response = await httpRequestHelper(
      `/api/v1/bookings/stripe-checkout/${tourId}`,
      { requestMethod: 'GET', sendPlainResponse: true }
    );

    // Handle request errors, if any and get the session
    const errorMessage =
      'Error Checking out. We could not checkout you out at this time. If this error persists, kindly contact the administrator of this site.';
    const session = await handleHttpErrors(response, errorMessage);

    /// send user to checkout page if all is well
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  });
};

export default checkoutWithStripe;
