// IMPORTS
import { env } from 'process';

// 3rd Party
import Stripe from 'stripe';

// Local Imports
import Booking from '../models/bookingsModel.js';
import Tour from '../models/toursModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import * as factory from '../helpers/handlersFactory.js';
import User from '../models/usersModel.js';

// HELPERS
const createBookingCheckout = async (session, res, next) => {
  // Save to DB
  try {
    const tour = session.client_reference_id;
    const user = (await User.findOne({ email: session.customer_details.email }))
      .id;
    const price = session.amount_total / 100;

    await Booking.create({ user, tour, price });

    return true;
  } catch (error) {
    next(new AppError('You already booked this tour.', 400));
    return false;
  }
};

// MIDDLEWARES
// ALIASES
/**
 * Allows admins to see all bookings, regardless of the user role.
 *
 * Only allow lead guides to see their own bookings and other users (Not other lead guides and admins).
 *
 * Only allow guides to see their own bookings (not allowed to see other guides or seeing users bookings).
 *
 * @TODO: Test the middleware handler
 */
export const aliasFilterBookingsByAgentRole = catchAsync(
  async (req, res, next) => {
    // Check who is querying
    if (req.user.role === 'admin') return next();

    // For guides, only return tours they have booked
    if (req.user.role === 'lead') {
      req.query = `agent=${req.user.id}`;
      return next();
    }

    // For lead guides, only return their own tours and tours other guides have booked

    if (req.user.role === 'lead-guide') {
      // If there is a query where agent is set to null or current user id, create a query and stop further evaluation
      if (req.user.id === req.query.agent || req.query.agent === 'null')
        return next();

      // Find all bookings they have booked
      const agentBookings = await Booking.find({
        agent: { $ne: req.user.id, $ne: null },
      }).populate({ path: 'agent', select: 'name role' });

      // Create a collection of agents ids, exclute admings and other lead-guides (a lead guide is only allowed to see their own bookings and all bookings done by guides)
      let queryString = `agent=${req.user.id}&agent=null`;

      // Do not process further if there is nothing in the agent Bookings array
      if (agentBookings.length === 0 || !agentBookings) {
        req.query = queryString;
        return next();
      }

      const agentsIds = agentBookings.map(agt => {
        if (agt.agent.role !== 'lead-guide' && agt.agent.role !== 'admin') {
          return agt.agent.id;
        }
      });

      // Generate comma separated agent query i.e. (agent=adsfaslf2342kajl&agent=gsdfawf45erwrbc23)
      agentsIds.forEach(el => (queryString += `&agent=${el}`));
      req.query = queryString;

      return next();
    }

    // next after filtering
    next(new AppError('You are not authorize to perform this action!', 400));
  }
);

// HANDLERS

// Get Checkout Session
export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1). Get the tours by id
  const tourId = req.params.tourId;
  const tour = await Tour.findById(tourId);

  // @TODO: Handle prevent getting checkout session if there is a dublicate tour purchase
  // NB: Not Ideal as anyone can book as many tours as they want

  // 2). Validate tour
  if (!tour)
    return next(AppError(`Could not find tour with the id: ${tourId}`, 400));

  // 3). Create the session
  const session = await new Stripe(
    env.STRIPE_SECRET_KEY
  ).checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/bookings`,
    cancel_url: `${req.protocol}://${req.get('host')}/tours/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [
          `https://natoursio.herokuapp.com/img/tours/${tour.coverImage}`,
        ],
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

//Create a booking session
export const webhookSession = catchAsync(async (req, res, next) => {
  // Implement
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = new Stripe().webhooks.constructEvent(
      req.body,
      signature,
      env.STRIPE_WEBHOOK_SECRET_KEY
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  let saveToDBStatus;
  if (event.type === 'checkout.session.completed') {
    saveToDBStatus = await createBookingCheckout(event.data.object, res, next);
  }

  if (!saveToDBStatus)
    return res
      .status(400)
      .send(`Webhook Error: User already booked this tour.`);

  res.status(200).json({ received: true });
});

// CRUD HANDLERS
export const getAllBookings = factory.getAll(Booking, { modelName: 'Booking' });

// Create Booking
export const createBooking = factory.createOne(Booking, {
  modelName: 'Booking',
});

// Get one Booking entry
export const getBooking = factory.getOne(Booking, { modelName: 'Booking' });

// Update Booking
export const updateBooking = factory.updateOne(Booking, {
  modelName: 'Booking',
});

// Delete booking
export const deleteBooking = factory.deleteOne(Booking, {
  modelName: 'Booking',
});
