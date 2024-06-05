const taskService = require('../services/taskService');
const { handleServerError } = require('../helpers/errorHandler.js');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasksByUser(req.user.id);
        res.json(tasks);
    } catch (err) {
        handleServerError(err, res);
    }
};

exports.createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    try {
        const task = await taskService.createTask(title, description, dueDate, priority, req.user.id);
        res.json(task);
    } catch (err) {
        handleServerError(err, res);
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, dueDate, priority, completed } = req.body;
    const taskFields = { title, description, dueDate, priority, completed };
    try {
        const task = await taskService.updateTaskById(req.params.id, taskFields, req.user.id);
        res.json(task);
    } catch (err) {
        handleServerError(err, res);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await taskService.deleteTaskById(req.params.id, req.user.id);
        res.json({ msg: 'Task deleted' });
    } catch (err) {
        handleServerError(err, res);
    }
};
