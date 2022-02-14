// IMPORTS
import { env } from 'process';

// 3rd Party
import Stripe from 'stripe';

// Local Imports
import Tour from '../models/toursModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// MIDDLEWARES

// HANDLERS

// Get Checkout Session
export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1). Get the tours by id
  const tourId = req.params.tourId;
  const tour = await Tour.findById(tourId);

  // 2). Validate tour
  if (!tour)
    return next(AppError(`Could not find tour with the id: ${tourId}`, 400));

  // 3). Create the session
  const session = await new Stripe(
    env.STRIPE_SECRET_KEY
  ).checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tours/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://natours.dev/img/tours/${tour.coverImage}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  // 4). Return the response
  res.status(200).json({
    status: 'success',
    data: {
      session,
    },
  });
});
