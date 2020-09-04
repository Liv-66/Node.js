const express = require('express');
const tourController = require('../constrollers/tourController');

const router = express.Router();

// Param Middleware
// router.param('id', tourController.checkID);

router.route('/').get(tourController.getAllTour).post(tourController.creatTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
