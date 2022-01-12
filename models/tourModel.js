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
  // description
  // images
  // startDates
  // max group size
});

// Middlewares

// Declare Model
const Tour = model('Tour', tourSchema);

// Export
export default Tour;
