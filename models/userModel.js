/// TEMPLATE FOR MODEL
// IMPORT DEPENDANCIES
// Global
import crypto from 'crypto';

// 3rd Party
import mongoose from 'mongoose';
import pkg from 'validator';
import bcrypt from 'bcryptjs';

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
    email: {
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
      select: false,
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

    // user password reset token expires In
    passwordResetTokenExpiresIn: Date,
  },
  {
    // Allow time stamps
    timestamps: true,

    // Allow virtual fields
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// @TODO: comparePassword, updatePasswordUpdatedAtField, hashPassword, createPasswordResetToken, checkPasswordUpdatedAt

// SET INDEXES

// DECLARE VIRTUALS

// DEFINE MIDDLEWARES

/**
 * Hash password on saving data
 */
userSchema.pre('save', async function (next) {
  // check if password field is modified
  if (!this.isModified('password')) return next();

  // hash password 12
  this.password = await bcrypt.hash(this.password, 12);

  // Do not persist password
  this.passwordConfirm = undefined;

  // next middleware
  next();
});

// DEFINE METHODS
/**
 * Query Method Compare Password
 * @param {String} password User plain password
 * @param {String} hashedPassword Hashed password stored in the DB
 * @returns {Boolean} Whether a password test passes or not
 */
userSchema.methods.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.models.createPasswordResetToken = async function () {
  // Create reset token
  const plainToken = await crypto.randomBytes(32).toString('hex');

  // Has the token
  const hashedToken = await crypto
    .createHash('sha256')
    .update(plainToken)
    .digest('hex');

  // Save hashed password Rest Token to DB
  this.passwordResetToken = hashedToken;

  // Save password Reset Token Expires In
  this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000; // 10 minutes

  return plainToken;
};

// CREATE MODEL
const User = model('User', userSchema);

// EXPORT MODEL
export default User;
