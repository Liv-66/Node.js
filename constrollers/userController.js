const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError(`Can't find user with this ID.`, 404));
  res.status(200).json({ status: 'success', data: { user } });
});

exports.creatUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ status: 'success', data: { newUser } });
  // res.status(500).json({
  //   status: 'error',
  //   message: 'the user is not yet built.😂',
  // });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // model validater
  });
  if (!user) return next(new AppError(`Can't find user with this ID.`, 404));
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new AppError(`Can't find user with this ID.`, 404));
  res.status(204).json({
    statue: 'success',
    data: null,
  });
});
