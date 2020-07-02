const express = require('express');
const router = express.Router();
const { readUser, updateUser } = require('../controllers/userController');
const { requireSignin, adminOnlyRoutes } = require('../controllers/authController');

router
    .route('/')
    .get(requireSignin, readUser)
    .put(requireSignin, updateUser);

//admin only example
//router.put('/admin', requireSignin, adminOnlyRoutes, updateUser);

module.exports = router;