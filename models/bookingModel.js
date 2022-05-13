/// IMPORTS
import mongoose from 'mongoose';

/// PREP SCHEMA AND MODEL
const { model, Schema } = mongoose;

/// DEFINE BOOKING SCHEMA
const bookingSchema = new Schema(
  {
    // Tour Field
    tour: {
      type: Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A booking must be associated to a tour'],
    },

    // User Field
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'A booking must be associated to a user'],
    },

    // Agent Field
    agent: {
      type: Schema.ObjectId,
      ref: 'User',
    },

    // Price Field
    price: {
      type: Number,
      required: [true, 'A booking must have a price value'],
      min: [1, 'A booking price must be at least a dollar or above'],
    },

    // Discount Field
    discount: {
      type: Number,
      default: 0,
      validate: {
        validator: function (val) {
          return value <= this.price;
        },
        message: 'Discount can only be below the price of a booking amount',
      },
    },

    // Payment Method Field
    paymentMethod: {
      type: String,
      enum: ['stripe', 'cash', 'm-pesa'],
      message:
        'Payment method not acceptable. We only accept payments via Stripe, M-Pesa, or cash via our lead agents',
    },

    // Payment Status Field
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

/// INDEXES
bookingSchema.index({ tour: 1, user: 1 });
bookingSchema.index({ agent: 1 });

/// MIDDLEWARES\
/**
 * Populate User and Tour on find query
 */
bookingSchema.pre(/^Find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name imageCover slug',
  });

  next();
});

/// DEFINE MODEL
const Booking = model('Booking', bookingSchema);

/// EXPORT BOOKING MODEL
export default Booking;
