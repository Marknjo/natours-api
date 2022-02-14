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

// Make the fields unique only one booking per person
bookingSchema.index({ user: 1, tour: 1 }, { unique: true });

// MIDDLEWARES
// Pre Middleware
// Prefill bookings on query
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'email name',
  }).populate({
    path: 'tour',
    select: 'name',
  });

  next();
});

// MODEL
const Booking = model('Booking', bookingSchema);

// EXPORT
export default Booking;
