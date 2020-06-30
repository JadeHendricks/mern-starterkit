const express = require('express');
const router = express.Router();
const { read, update } = require('../controllers/user');
const { requireSignin, adminOnlyRoutes } = require('../controllers/auth');
//const { runValidation } = require('../validators/index');
//const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router
    .route('/user')
    .get(requireSignin, read)
    .put(requireSignin, update);

router
    .route('/admin')
    .put(requireSignin, adminOnlyRoutes, update);

module.exports = router;