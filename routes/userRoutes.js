const express = require('express');
const userController = require('../constrollers/userController');
const authController = require('../constrollers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updadeMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.route('/').get(userController.getAllUser)
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.notAllowUpdataPassword, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
