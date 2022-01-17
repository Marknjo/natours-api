// IMPORTS
import mongoose from 'mongoose';
import pkg from 'validator';
import bcryptjs from 'bcryptjs';

// INIT
const { Schema, model } = mongoose;
const { isEmail } = pkg;

// DEFINE USER SCHEMA
const userSchema = new Schema(
  {
    // User name
    name: {
      type: String,
      required: [true, 'Provide user name'],
      trim: true,
    },

    // User email
    email: {
      type: String,
      required: [true, 'User requires an email address'],
      unique: true,
      validate: [isEmail, 'User email must be in the valid format'],
      lowercase: true,
      trim: true,
    },

    // User roles
    role: {
      type: String,
      enum: {
        values: ['lead-guide', 'guide', 'admin', 'user'],
        message: '{VALUE} not a valid role',
      },
      default: 'user',
    },

    // User photo
    photo: {
      type: String,
      default: 'default.jpg',
    },

    // User password
    password: {
      type: String,
      required: [true, 'Submit password to continue'],
      trim: true,
      minlength: [8, 'Password length should be above 8 characters'],
    },

    // User password confirm
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Password does not match',
      },
    },

    // User password updated at
    passwordUpdatedAt: Date,
  },
  {
    // Timestamps
    timestamps: true,

    // Enable Virtuals
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// VIRTUALS
// INDEX
// MIDDLEWARES
// Document Middleware
// Hash password before save
userSchema.pre('save', async function (next) {
  // check first if the password is modified
  if (!this.isModified('password')) {
    return next();
  }

  // hash password
  this.password = await bcryptjs.hash(this.password, 12);

  // Stop persisting of the passwordConfirm to the DB
  this.passwordConfirm = undefined;

  next();
});

// MODEL
const User = model('User', userSchema);

// EXPORT USER MODEL
export default User;
