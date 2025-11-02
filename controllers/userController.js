// import AppError from '../utils/appError.js';
import AppError from '../utils/appError.js';
import User from './../models/userModel.js';
import catchAsync from './../utils/catchAsync.js';
import { deleteOne, updateOne } from './factoryHandler.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}, { password: 0 });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length, // we send results cause we sent multiple tours not just one.
    data: { users },
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('You cannot updated password here!! Please use: /update-password', 400)
    );
  }

  // 2. Filter out unwanted fields that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet.',
  });
}

// Do Not updated Password with this
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
