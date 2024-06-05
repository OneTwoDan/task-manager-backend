const express = require('express');
const authRoutes = require('./authRoutes');
const taskRoutes = require('./tasksRoutes');
const projectRoutes = require('./projectRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/project', projectRoutes);

module.exports = router;