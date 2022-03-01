/// TEMPLATE FOR MODEL
// IMPORT DEPENDANCIES
// 3rd Party
import mongoose from 'mongoose';
import pkg from 'validator';

// DECLARE SCHEMA & MODEL
const { model, Schema } = mongoose;

// Validations
const { isEmail } = pkg;

// DEFINE SCHEMA
const userSchema = new Schema(
  {
    // User name
    name: {
      type: String,
      required: [true, 'Username field must be provided'],
      trim: true,
    },

    // User Email
    name: {
      type: String,
      required: [true, 'A user must have an email address'],
      unique: true,
      trim: true,
      validate: [isEmail, 'Email is not in a valid format'],
      lowercase: true,
    },

    // User Role
    role: {
      type: String,
      default: 'user',
      lowercase: true,
      enum: {
        values: ['admin', 'lead-guide', 'guide', 'user'],
        message: 'Invalid role type.',
      },
    },

    // User Active Status
    active: {
      type: Boolean,
      default: true,
    },

    // User Accout Confirm
    accountConfirmed: {
      type: Boolean,
      default: true,
    },

    // User Photo
    photo: {
      type: String,
      default: 'default.jpg',
    },

    // User password
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      trim: true,
    },

    // User password Confirm
    passwordConfirm: {
      type: String,
      required: [true, 'You must include a password confirm'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Password do not match',
      },
    },

    // user password updated at
    passwordUpdatedAt: Date,

    // User password reset token
    passwordResetToken: String,

    // user password reset token expires At
    passwordResetTokenExpiresAt: Date,
  },
  {
    // Allow time stamps
    timestamps: true,

    // Allow virtual fields
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// SET INDEXES

// DECLARE VIRTUALS

// DEFINE MIDDLEWARES

// DEFINE METHODS

// CREATE MODEL
const User = model('User', userSchema);

// EXPORT MODEL
export default User;
