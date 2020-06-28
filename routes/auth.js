const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/auth');
const { runValidation } = require('../validators/index');
const { userSignupValidator } = require('../validators/auth');

router
    .route('/signup')
    .post(userSignupValidator, runValidation, signup);

module.exports = router;