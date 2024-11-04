const express = require('express');
const projectController = require('../Controllers/projectController');
const { authMiddleware, roleMiddleware } = require('../Middleware/authMiddleware');

const router = express.Router();


router.route('/')
    .get(authMiddleware, projectController.getProject)
    .post(authMiddleware, roleMiddleware, projectController.createProject);

router.route('/:id')
    .get(authMiddleware, projectController.getProjectById)
    .patch(authMiddleware, projectController.updateProject)
    .delete(authMiddleware, projectController.deleteProject);

module.exports = router;