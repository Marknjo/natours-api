// IMPORTS
import User from '../models/usersModel.js';
import catchAsync from '../utils/catchAsync.js';

// HANDLERS DEFINATION
// TODO: SIGNUP, LOGIN, RESTRICTTO, PROTECT

// Implement signup functionality
export const signup = catchAsync(async (req, res, next) => {
  // 1). Get data
  const { name, password, passwordConfirm, email, photo } = req.body;

  // 2). Submit it to the create method.
  const createdUser = await User.create({
    name,
    password,
    passwordConfirm,
    email,
    photo,
  });

  // 3). Implement password hashing (Save mongoose middleware)
  // 4). Sign user. Using the JWT
  // 5). Prep data to send to the user, exclude password field
  // 6). Send data to the users with success
  // TODO: redirect user to the dashboard, front end
  res.status(201).json({
    status: 'success',
    data: {
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        photo: createdUser.photo,
      },
    },
  });
});

// Implement Login functionality
// Implement Restrict to functionality
// Implement protect route functionality
