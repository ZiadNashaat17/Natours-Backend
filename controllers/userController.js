// import AppError from '../utils/appError.js';
import User from './../models/userModel.js';
import catchAsync from './../utils/catchAsync.js';

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}, { password: 0 });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length, // we send results cause we sent multiple tours not just one.
    data: { users },
  });
});

export function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet.',
  });
}

export function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet.',
  });
}

export function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet.',
  });
}

export function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this rout is not defined yet.',
  });
}
