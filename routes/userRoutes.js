const express = require('express');
const userController = require('../constrollers/userController');
const authController = require('../constrollers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all following routes
router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);
router.get('/getMe', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updadeMe);
router.delete('/deleteMe', userController.deleteMe);

// Restrict to ADMIN
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUser);
router
  .route('/:id') 
  .get(userController.getUser)
  .patch(userController.notAllowUpdataPassword, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
