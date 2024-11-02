const express = require('express');
const authController = require('../Controllers/authController')

const router = express.Router();

router.route('/').get(authController.index);
router.route('/signup').post(authController.SignUp);
router.route('/sigin').post(authController.signIn);

module.exports = router;