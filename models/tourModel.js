// IMPORT DEPENDANCIES
// 3rd Party
import mongoose from 'mongoose';

// DECLARE SCHEMA & MODEL
const { model, Schema } = mongoose;

// DEFINE SCHEMA
// FIELDS: name, duration, maxGroupSize, difficulty, ratingsAverage, ratingsQuantity, price, startDates, description, summary, imageCover, images, locations, startLocations, guides
const tourSchema = new Schema(
  {
    // Define Name
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'A tour must have a name'],
      maxlength: [50, 'A tour name must be less than 50 characters'],
      minlength: [10, 'A tour name must be above 10 characters'],
    },

    // Define Duration
    duration: {
      type: Number,
      min: [1, 'A tour duration must be above 1 day'],
      required: [true, 'A must have a duration set'],
    },

    // Define maxGroupSize
    maxGroupSize: {
      type: Number,
      min: [1, 'A tour group size must at least have one member'],
      required: [true, 'A tour must have a maximum group size declared'],
    },

    // Define difficulty
    difficulty: {
      type: String,
      default: 'easy',
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message:
          'A tour difficulty level can only be either easy, medium or difficulty.',
      },
    },

    // Define ratingsAverage
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A tour rating can only be above one'],
      max: [5, 'A tour rating can only be either 5 or below 5'],
    },

    // Define ratingsQuantity
    ratingsQuantity: {
      type: Number,
      default: 0,
      min: [
        0,
        'A tour rating quanity can only be a positive number either 0 or above',
      ],
    },

    // Define price
    price: {
      type: Number,
      min: [0, 'A tour price can only be above 0'],
      required: [true, 'A tour must have a price declared'],
    },

    // Define startDates
    startDates: {
      type: [Date],
      required: [true, 'A tour must have start dates set'],
    },

    // Define tour Description
    description: String,

    // Define tour summary
    summary: {
      type: String,
      required: [true, 'A tour must have a summary'],
    },

    // Define imageCover
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image cover defined'],
    },

    // Define images
    images: [String],

    // @TODO: Implementation Guides
    // Define tour guides
    // guides: [{
    //     type: Schema.objectId,
    //     ref: 'User'
    // }],
    // Define locations
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],

    // Define startLocation
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
  },
  {
    // Enable virtual fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

    // Enable timestamps
    timestamps: true,
  }
);

// SET INDEXES

// DECLARE VIRTUALS
tourSchema.virtual('durationWeeks', function () {
  return this.duration / 7;
});

// DEFINE MIDDLEWARES

// DEFINE METHODS

// CREATE MODEL
const Tour = model('Tour', tourSchema);

// EXPORT MODEL
export default Tour;
