const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowFilter) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFilter.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updadeMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This route can not update password.', 400));

  const user = await User.findByIdAndUpdate(
    req.user.id,
    filterObj(req.body, 'name', 'email'),
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.notAllowUpdataPassword = (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This route can not update password.', 400));
  next();
};
exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
