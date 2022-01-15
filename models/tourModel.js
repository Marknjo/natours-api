// Import mongoose
import mongoose from 'mongoose';
import slugify from 'slugify';

// Setup schema and model
const { Schema, model } = mongoose;

// Define Schema
const tourSchema = new Schema(
  {
    // name
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Tour tittle should be within 50 characters'],
      minlength: [10, 'Tour tittle should be above 10 characters'],
    },

    // Slug
    slug: String,

    // Price
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },

    // Price Discount field
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val <= this.price;
        },
        message:
          'Discount price should be below or equal to the tour current price',
      },
    },

    // ratingsAverage
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be more than 1'],
      max: [5, 'Rating must be below 5'],
    },

    // ratingsquantity
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    // duration
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration in days'],
    },

    // difficulty
    difficulty: {
      type: String,
      default: 'easy',
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message:
          '{VALUE} is not one of the required options between: easy, medium, or difficult.',
      },
    },

    // summary
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary description.'],
    },

    // Secret Tours field
    secret: {
      type: Boolean,
      default: false,
    },

    // description
    description: {
      type: String,
      trim: true,
    },

    // images
    images: [String],

    // Image Cover
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image cover.'],
    },

    // startDates
    startDates: [Date],

    // max group size
    maxGroupSize: {
      type: Number,
      required: [true, 'A trour must have a max group size value.'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// MIDDLEWARES
// Document Middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Query Middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secret: { $ne: true } });

  next();
});

// Aggregation Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secret: { $ne: true } } });
  next();
});

// Declare Model
const Tour = model('Tour', tourSchema);

// Export
export default Tour;
