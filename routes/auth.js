const express = require('express');
const router = express.Router();
const { signup, signin, accountActivation } = require('../controllers/auth');
const { runValidation } = require('../validators/index');
const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router
    .route('/signup')
    .post(userSignupValidator, runValidation, signup);

router
    .route('/account-activation')
    .post(accountActivation);

router
    .route('/signin')
    .post(userSigninValidator, runValidation, signin);


module.exports = router;