// IMPORT
import mongoose from 'mongoose';

// INIT
const { Schema, model } = mongoose;

// DEFINE SCHEMA
const bookingSchema = new Schema(
  {
    // Tour
    tour: {
      type: Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A booking must have a tour'],
    },
    // User
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'A booking must have a user'],
    },
    // Booking Agent
    agent: {
      type: Schema.ObjectId,
      ref: 'User',
      default: null,
    },
    // price
    price: {
      type: Number,
      required: [true, 'A booking must have a price field'],
      min: [0, 'A booking price must be above 0'],
    },
    // Paid
    paid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// INDEXES
// Make the fields unique only one booking per person
bookingSchema.index({ user: 1, tour: 1 });

// Make the booking agent referensable
bookingSchema.index({ agent: 1 });

// MIDDLEWARES
// Pre Middleware
// Prefill bookings on query
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'email name role',
  }).populate({
    path: 'tour',
    select: 'name startDates',
  });

  next();
});

// MODEL
const Booking = model('Booking', bookingSchema);

// EXPORT
export default Booking;
