const express = require('express');
const router = express.Router();
const { signup, signin, accountActivation, forgotPassword, resetPassword, googleLogin } = require('../controllers/auth');
const { runValidation } = require('../validators/index');
const { 
    userSignupValidator, userSigninValidator, 
    forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth');

router
    .route('/signup')
    .post(userSignupValidator, runValidation, signup);

router
    .route('/account-activation')
    .post(accountActivation);

router
    .route('/signin')
    .post(userSigninValidator, runValidation, signin);

router
    .route('/forgot-password')
    .put(forgotPasswordValidator, runValidation, forgotPassword)

router
    .route('/reset-password')
    .put(resetPasswordValidator, runValidation, resetPassword)

router
    .route('/google-login')
    .post(googleLogin)

module.exports = router;