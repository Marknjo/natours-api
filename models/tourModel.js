// Import mongoose
import mongoose from 'mongoose';

// Setup schema and model
const { Schema, model } = mongoose;

// Define Schema
const tourSchema = new Schema({
  // name
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  // Price
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  // ratingsAverage
  ratingsAverage: {
    type: Number,
    default: 4.5,
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
});

// Middlewares

// Declare Model
const Tour = model('Tour', tourSchema);

// Export
export default Tour;
