// IMPORTS
import mongoose from 'mongoose';

// SETUP
const { Schema, model } = mongoose;

// Review Schema Definition
// review description, tour Reference, user reference, createdAt and UpdatedAt, rating
const reviewSchema = new Schema(
  {
    // Review Description
    review: {
      type: String,
      required: [true, 'You must include your review details'],
      trim: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must have a user'],
    },
    tour: {
      type: Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must belong to a tour'],
    },
    rating: {
      type: Number,
      max: [5, 'A review rating must be below 5'],
      min: [1, 'A review rating must be above 1'],
      required: [
        true,
        'You must submit your review rating score between 1 - 5',
      ],
    },
  },
  {
    // timestamp
    timestamps: true,

    // virtuals
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// VIRTUAL FIELDS,
// INDEXES,
// MIDDLEWARES
// QUERY METHODS
// 1). Document Middlewares
// 2). Query Middlewares
// Ensure to populate tours and users model
reviewSchema.pre(/^find/, function (next) {
  // Populate tour and user field
  this.populate({
    path: 'user',
    select: 'name role photo',
  });

  // NOTE: Causes cyclic fetching of tours
  //   .populate({
  //     path: 'tour',
  //     select:
  //       'name duration maxDuration ratingsAverage ratingsQuantity price summary',
  //   });

  // Return next
  next();
});
// MODEL DECLARATION
const Review = model('Review', reviewSchema);

// EXPORT
export default Review;
