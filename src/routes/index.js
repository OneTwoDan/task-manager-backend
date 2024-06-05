const express = require('express');
const authRoutes = require('./auth');
const taskRoutes = require('./tasks');
const projectRoutes = require('./project');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
/* router.use('/project', projectRoutes); */

module.exports = router;