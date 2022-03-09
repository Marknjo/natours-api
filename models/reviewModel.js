// IMPORT DEPENDANCIES
// 3rd Party
import mongoose from 'mongoose';

// DECLARE SCHEMA & MODEL
const { Schema, model } = mongoose;

// DEFINE SCHEMA
const reviewSchema = new Schema(
  {
    // Define Review
    review: {
      type: String,
      required: [true, 'A review must have a body'],
      trim: true,
    },

    // Define Tour
    tour: {
      type: Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must have a tour'],
    },

    // Define User
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user.'],
    },

    // Define ratings
    rating: {
      type: Number,
      required: [true, 'A review must have a rating declared.'],
      min: [1, 'A rating must be a bove 1'],
      max: [5, 'A rating must be below 5'],
    },
  },
  {
    // Allow Timestamp
    timestamps: true,

    // Set Virtuals
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// SET INDEXES

// DECLARE VIRTUALS

// DEFINE MIDDLEWARES

// DEFINE METHODS

// CREATE MODEL
const Review = model('Review', reviewSchema);

// EXPORT MODEL
export default Review;
