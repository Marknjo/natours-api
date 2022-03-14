// IMPORT DEPENDANCIES
// 3rd Party
import mongoose from 'mongoose';

// local
import Tour from './tourModel.js';

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
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// DECLARE VIRTUALS

// DEFINE MIDDLEWARES
// STATIC METHOD

/**
 * Auto-update tour average ratings and ratings quantity based on provided user review rating
 * @param {String} tourId Tour Id
 * @returns {never}
 */
reviewSchema.statics.calculateRatingsQuantityAndAverage = async function (
  tourId
) {
  // Aggregate
  const stats = await this.aggregate([
    // Match tour by tourId
    {
      $match: { tour: tourId },
    },

    // Group by _id: tour, nRatings, avgRatings
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRatings: { $avg: '$rating' },
      },
    },
  ]);

  // Update tour based on the stats
  // If Aggregate is not empty
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRatings,
      ratingsQuantity: stats[0].nRatings,
    });

    return;
  }

  // If aggregate is empty
  await Tour.findByIdAndUpdate(tourId, {
    ratingsAverage: 4.5,
    ratingsQuantity: 0,
  });

  return;
};

// PRE MIDDLEWARE
/**
 * Populate user details for all find query
 */
reviewSchema.pre(/^find/, function (next) {
  // Only populate users
  this.populate({
    path: 'user',
    select: 'name role photo',
  });

  // next
  next();
});

// POST MIDDLEWARE

/**
 * Update ratings for when creating or savings
 */
reviewSchema.post('save', function () {
  // Update the tour ratings
  this.constructor.calculateRatingsQuantityAndAverage(this.tour);
});

/**
 * Update ratings for when updating and deleting a review
 */
reviewSchema.post(/^findOneAnd/, function (doc, next) {
  // Update the tour ratings
  doc.constructor.calculateRatingsQuantityAndAverage(doc.tour);

  // Next
  next();
});

// DEFINE METHODS

// CREATE MODEL
const Review = model('Review', reviewSchema);

// EXPORT MODEL
export default Review;
