const express = require('express');
const tourController = require('../constrollers/tourController');
const authController = require('../constrollers/authController');

const router = express.Router();

// Param Middleware
// router.param('id', tourController.checkID);

router
  .route('/top-3-tours')
  .get(tourController.aliasTopThree, tourController.getAllTour);
router.route('/monthly-tour/:year').get(tourController.getMonthlyNum);
router
  .route('/')
  .get(authController.protect, tourController.getAllTour)
  .post(tourController.creatTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
