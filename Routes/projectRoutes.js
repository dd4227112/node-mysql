const express = require('express');
const projectController = require('../Controllers/projectController');
const { authMiddleware, roleMiddleware } = require('../Middleware/authMiddleware');

const router = express.Router();

router.route('/').get(authMiddleware, projectController.getProject);
router.route('/').post(authMiddleware, roleMiddleware, projectController.createProject);

module.exports = router;