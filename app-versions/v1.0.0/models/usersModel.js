// IMPORTS
// Global Imports
import crypto from 'crypto';

// 3rd Party Imports
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

    // User active status
    active: {
      type: Boolean,
      default: true,
      select: false,
    },

    // User password
    password: {
      type: String,
      required: [true, 'Submit password to continue'],
      trim: true,
      minlength: [8, 'Password length should be above 8 characters'],
      select: false,
    },

    // User password confirm
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Password does not match',
      },
    },

    // User password updated/changed at
    passwordChangedAt: Date,

    // PASS RESET SECTION
    // Password reset token
    passwordResetToken: String,

    // Password reset expired in
    passwordResetExpiresIn: Date,
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

// Update password reset at if the password is modified and it is not a new document
userSchema.pre('save', function (next) {
  // ensure this is password update case
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  // Pass to next
  next();
});

// Query Middlewares
// Do not query deactivated users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance Methods
// Compare user password
userSchema.methods.compareUserPassword = async function (
  candidatePass,
  hashedPass
) {
  return await bcryptjs.compare(candidatePass, hashedPass);
};

// Check if password was updated .
// User did not update the password before trying to access the protected route.
userSchema.methods.checkPasswordChangedAt = function (jwtTokenTime) {
  // check if there is passwordUpdatedAt field
  if (this.passwordChangedA) {
    const updatedTimeMs = parseInt(
      new Date(this.passwordChangedA).getTime() / 1000,
      10
    );

    return jwtTokenTime < updatedTimeMs;
  }

  return false;
};

// Generate Reset token
userSchema.methods.generatePasswordResetToken = function () {
  // Generate Random Hex String
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash the string
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // assign two fields
  // passwordResetToken
  this.passwordResetToken = hashedToken;

  // PasswordExpieresAt
  this.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000; // token expires in 10 minutes time

  // Return the generated Random HexString
  return resetToken;
};

// MODEL
const User = model('User', userSchema);

// EXPORT USER MODEL
export default User;
