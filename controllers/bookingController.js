// IMPORTS
// Global Imports
import { env } from 'process';

// 3rd Party Imports
import Stripe from 'stripe';

/// Local Imports
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../helpers/handlersFactory.js';
import catchAsync from '../library/catchAsyc.js';
import AppError from '../library/appErrors.js';
import Booking from '../models/bookingModel.js';
import Tour from '../models/tourModel.js';
import User from '../models/userModel.js';
import { asyncErrorsWrapperHandler } from '../utils/errorWrappers.js';

// HELPERS

const createStripeBookingHelper = async session => {
  asyncErrorsWrapperHandler(next, () => {
    // Get the session object
    const {client_reference_id, customer_details, amount_total} = session;

    /// Get user id
    const user = (await User.findOne({email: customer_details.email})).id;

    /// create booking
    await Booking.create({
      user,
      tour: client_reference_id,
      price: amount_total/100,
      paymentMethod: 'stripe',
      paid: true
    })

   
  }, true);
};

// MIDDLEWARES
// @TODO: stripeBooking, filterBookingsByRole

/**
 * The handler checks if the user has already booked a tour. 
 * If the tour is booked, in the future, user is asked if they want to help someone else book their tour.
 * @NOTE: There should be a discounting option, or a way for a user to book multiple tours under multiple names
 * @TODO: To be implemented later
 **/
export const checkBookingStatus = catchAsync(async (req, res, next) => {
  // Send response to check if tour is booked

  // 1) Get tour Id and UserId
  const tour = req.params.tourId;
  const user = req.user.id;

  // 2) Query booking with tour and user
  const bookings = await Booking.find({ tour, user });

  // Check if there are booking in the found bookings array

  if (bookings.length === 0) return next();

  const foundBookings = bookings.map(booking => {
    const getStartDate = parseInt(
      new Date(booking.tour.startDates.at(0)).getTime(),
      10
    );
    const currentDate = Date.now();

    // Testing dates
    if (getStartDate >= currentDate) {
      return {
        name: booking.tour.name,
        bookedAt: booking.createdAt,
        id: booking.tour.id,
      };
    }
  });

  // 3) Based on response check if tour start date is greater than current date (date.now())
  // Tour was booked in the past (Book again)
  if (foundBookings.length === 0 || !foundBookings.at(0)) {
    return next();
  }

  // There are active bookings (one or more)
  // Show the modal and direct user on what to do
  const data = {};
  data.tourIsOpen = true;
  data.tourIsBooked = true;
  data.tour = foundBookings;

  // 4) Return response to the client with the object {tourIsOpen, tourIsBooked} the
  return res.status(200).json({
    status: 'success',
    results: foundBookings.length,
    data,
  });
});

// HANDLERS
/// CHECKOUT HANDLERS
// @TODO: getStripeCheckoutSession[@DONE:], stripeWebhookCheckout
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

/**
 * Handle Stripe Webhook checkout
 * @NOTE: Only works is site is hosted
 */
export const stripeWebhookCheckoutHandler = catchAsync(
  async (req, res, next) => {
    // get the signature from the header
    const signature = req.headers['stripe-signature'];

    // Create Event
    const event = await new Stripe().webhooks.constructEvent(
      req.body,
      signature,
      env.STRIPE_WEBHOOK_SECRET_KEY
    );

    // Check of checkout event is successful
    if (event.type === 'checkout.session.completed') {
      await createStripeBookingHelper(event.data.object);
    }

    // send a success response
    res.status(200).json({ 
      status: 'success', 
      received: true, 
    });
  }
);

/// CRUD HANDLERS
/// @NOTE: The following handlers are only accessible to admin and lead guide
/// @DONE: getAllBookings, getBooking, updateBooking, createBooking, deleteBooking

/**
 * Get all bookings
 */
export const getAllBookings = getAll(Booking, { modelName: 'booking' });


/**
 * Get One Booking results
 */
export const getBooking = getOne(Booking, {modelName: 'booking'})

/**
 * Update A Booking status
 */
export const updateBooking = updateOne(Booking, {modelName: 'booking'});

/**
 * Create a booking
 */
export const createBooking = createOne(Booking, {modelName: 'booking'});

/**
 * Delete a booking
 */
export const deleteBooking = deleteOne(Booking, {modelName: 'booking'})