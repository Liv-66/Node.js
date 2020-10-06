const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) return next(new AppError('There is no tour with that name.', 404));
  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

exports.login = (req, res) => {
  res.status(200).render('lonin', {
    title: 'Log In',
  });
};

// exports.signup = catchAsync(async (req, res) => {
//   res.status(200).render('signup');
// });
