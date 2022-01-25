// IMPORTS
// GLOBAL
// 3rd PARTY
import mongoose from 'mongoose';
import slugify from 'slugify';

// LOCAL
import User from './usersModel.js';

// INIT
const { Schema, model } = mongoose;

// DEFINE TOUR SCHEMA

const tourSchema = new Schema(
  {
    // Define Schema Here
    // Tour Name
    name: {
      type: String,
      unique: true,
      require: [true, 'A tour must have a name'],
      maxlength: [50, 'A Tour length must be within 50 characters'],
      minlength: [10, 'A tour length must be more than 10 charaters'],
      trim: true,
    },

    // Tour Slug
    slug: String,

    // TODO: Delete Handle Secret Tour
    secret: {
      type: Boolean,
      default: false,
    },

    // Duration
    duration: {
      type: Number,
      require: [true, 'A tour must have a duration'],
    },

    // Price
    price: {
      type: Number,
      require: [true, 'A tour must have a price'],
    },

    // Price Discount
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message:
          'Price discount should be less than the total price of the tour.',
      },
    },

    // Tour Ratings Average
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A tour rating must be above 1'],
      max: [5, 'A tour rating must be below 5 '],
    },

    // Tour Ratings Quantity
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    // Tours difficulty
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message:
          'A tour difficulty can only be either easy, medium, or difficult.',
      },
    },

    // Tour Max Group Size
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size'],
      min: [
        1,
        'You entered{VALUE}, while a tour must have at least one member.',
      ],
    },

    // Tour Summary
    summary: {
      type: String,
      required: [true, 'A tour must have a summary'],
      trim: true,
    },

    // Tour Description
    description: String,

    // Tour Image Cover
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image cover'],
    },

    // Tours Location
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

    // Tours Start Location
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        description: String,
        day: Number,
      },
    ],

    // Guides
    guides: [
      {
        type: Schema.ObjectId,
        ref: 'User',
      },
    ],

    // Tour Review
    // reviews: [
    //   {
    //     type: Schema.ObjectId,
    //     ref: 'Review',
    //   },
    // ],

    // Tour Images
    images: [String],

    // Tour Start Dates
    startDates: [Date],
  },
  {
    // Allow timestamp
    timestamps: true,
    // Allow Virtuals object and to JSON
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// INDEXES
// Set slug to be an index
tourSchema.index({ slug: 1 });

// VIRUALS
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Populate tour reviews whenever we call a tour model even if the tour does not have actual reviews
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// INDEXES
// MIDDLEWARES
// 1). Document Middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, trim: true });
  next();
});

// 2). Query Middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secret: { $ne: true } });

  next();
});

// 3). Aggregate Middlewares

// Get A tour guides
tourSchema.pre(/^find/, function (next) {
  this.populate({ path: 'guides', select: 'name role' });
  next();
});

// Aggregate Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secret: { $ne: true } } });

  next();
});

// DEFINE TOUR MODEL
const Tour = model('Tour', tourSchema);

// EXPORT TOUR MODEL
export default Tour;
