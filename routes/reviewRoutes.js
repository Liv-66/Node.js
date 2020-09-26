const express = require('express');
const reviewController = require('../constrollers/reviewController');
const authController = require('../constrollers/authController');

const router = express.Router();

router
  .route('/')
  .post(reviewController.creatReview)
  .get(reviewController.getAllReviews);

router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview
  );

module.exports = router;
