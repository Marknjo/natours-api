// IMPORTS
import mongoose from 'mongoose';
import Tour from './toursModel.js';

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
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// MIDDLEWARES
// STATIC METHODS
// Auto calculate Average Ratings and Quantity ratings
reviewSchema.statics.calcRatingsQtyAndAvg = async function (tourId) {
  // Create the aggregation
  const stats = await this.aggregate([
    // Match
    {
      $match: { tour: tourId },
    },
    // Grouping
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  // Check if there is stats
  if (stats.length > 0) {
    // There is stats
    return await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  }

  return await Tour.findByIdAndUpdate(tourId, {
    ratingsAverage: 4.5,
    ratingsQuantity: 0,
  });

  // aggregate response
};

// QUERY METHODS
// 1). Document Middlewares
// Calculate Average ratings and Quantity immediately after savings
reviewSchema.post('save', async function (doc, next) {
  await doc.constructor.calcRatingsQtyAndAvg(doc.tour);

  next();
});

// 2). Query Middlewares
// Handle update of Ratings Quantity and Average for delete and update
reviewSchema.post(/^findOneAnd/, async function (doc, next) {
  await doc.constructor.calcRatingsQtyAndAvg(doc.tour);
  next();
});

// 3). Aggregate Middlewares

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
