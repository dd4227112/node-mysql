const express = require('express');
const authController = require('../Controllers/authController')

const router = express.Router();

router.route('/').get(authController.index);

module.exports = router;