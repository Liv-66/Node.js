const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
// Middleware

exports.getAllTour = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.creatTour = factory.creatOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
// exports.getTourstats = async (req, res) => {
//   try {
//     // const stats = Tour.aggregate([
//     //   {
//     //     $match {
//     //       ratingsAverage: {$gte: 4.5}
//     //     }
//     //   }
//     // ])

//   } catch(err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };
exports.aliasTopThree = (req, res, next) => {
  req.query.limit = '3';
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,price,difficulty,ratingsAverage,summary';
  next();
};

exports.getMonthlyNum = catchAsync(async (req, res, next) => {
  const { year } = req.params;
  const stats = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $sort: { numTours: -1 },
    },
    {
      $project: { _id: 0 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    message: 'month',
    year: stats,
  });
});
