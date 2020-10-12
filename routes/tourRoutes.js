const express = require('express');
const tourController = require('../constrollers/tourController');
const authController = require('../constrollers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Param Middleware
// router.param('id', tourController.checkID);

// app.use('/api/v1/reviews', reviewRouter);
router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-3-tours')
  .get(tourController.aliasTopThree, tourController.getAllTour);
router
  .route('/monthly-tour/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyNum
  );

router
  .route('/')
  .get(tourController.getAllTour)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.creatTour
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImage,
    tourController.resizeTourImage,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
