import { a as asyncErrorWrapper, h as httpRequestHelper, b as handleHttpErrors } from "./index.js";
const checkoutWithStripe = async (tourId, stripePublicKey) => {
  return asyncErrorWrapper(async () => {
    const stripe = Stripe(stripePublicKey);
    const response = await httpRequestHelper(`/api/v1/bookings/stripe-checkout/${tourId}`, { requestMethod: "GET", sendPlainResponse: true });
    const errorMessage = "Error Checking out. We could not checkout you out at this time. If this error persists, kindly contact the administrator of this site.";
    const session = await handleHttpErrors(response, errorMessage);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  });
};
export { checkoutWithStripe as default };
