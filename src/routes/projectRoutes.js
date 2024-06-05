const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.post('/', projectController.createProject);
router.put('/:projectId/members', projectController.manageProjectMembers);
router.post('/:projectId/tasks', projectController.addTaskToProject);

module.exports = router;