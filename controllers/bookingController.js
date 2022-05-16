// IMPORTS
// Global Imports
import { env } from 'process';

// 3rd Party Imports
import Stripe from 'stripe';

/// Local Imports
import catchAsync from '../library/catchAsyc.js';
import AppError from '../library/appErrors.js';
import Booking from '../models/bookingModel.js';
import Tour from '../models/tourModel.js';

// HELPERS

// MIDDLEWARES
// @TODO: stripeBooking, filterBookingsByRole

// HANDLERS
/// CHECKOUT HANDLERS
// @TODO: getStripeCheckoutSession, stripeWebhookCheckout
/**
 *  Start a payment process by receiving product and setting the product details
 */
export const getStripeCheckoutSession = catchAsync(async (req, res, next) => {
  // 1). Get the tour by param TourId

  const tour = await Tour.findById(req.params.tourId);
  if (!tour || tour.length === 0)
    return next(new AppError('Could not find tour with that id', 400));

  // 2). Create Stripe Session

  const session = await new Stripe(
    env.STRIPE_SECRET_KEY
  ).checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/?price=${
      tour.price
    }&tour=${tour.id}&user=${req.user.id}`, // Temporaly,
    cancel_url: `${req.protocol}://${req.get('host')}/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: tour.id,
    line_items: [
      {
        name: tour.name,
        description: tour.summary,
        images: [
          `https://natoursio.herokuapp.com/img/tours/${tour.imageCover}`,
        ],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  // 3). Send response
  res.status(200).json({
    status: 'success',
    data: {
      session,
    },
  });
});

/// CRUD HANDLERS
// @TODO: getAllBookings, getBooking, updateBooking, createBooking, deleteBooking
