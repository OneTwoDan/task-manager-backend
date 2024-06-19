const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, taskController.getTasks);
router.post('/', auth, taskController.createTask);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);
router.get('/search', taskController.getFilteredTasks);

module.exports = router;
