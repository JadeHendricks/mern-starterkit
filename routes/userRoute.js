const express = require('express');
const router = express.Router();
const { readUser, updateUser } = require('../controllers/userController');
const { protect, adminOnlyRoutes } = require('../controllers/authController');

router
    .route('/')
    .get(protect, readUser)
    .put(protect, updateUser);

//admin only example
//router.put('/admin', requireSignin, adminOnlyRoutes, updateUser);

module.exports = router;