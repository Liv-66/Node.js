const express = require('express');
const viewController = require('../constrollers/viewController');
const authController = require('../constrollers/authController');

const router = express.Router();

router.use(authController.isLogedIn);

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.login);

// router.get('/signup', viewController.signup);

module.exports = router;
