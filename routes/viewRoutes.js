const express = require('express');
const viewController = require('../constrollers/viewController');
const authController = require('../constrollers/authController');

const router = express.Router();

// router.use(authController.isLogedIn);

router.get('/', authController.isLogedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLogedIn, viewController.getTour);
router.get('/login', authController.isLogedIn, viewController.login);
router.get('/me', authController.protect, viewController.getMe);

// router.get('/signup', viewController.signup);

module.exports = router;
