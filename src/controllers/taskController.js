const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasksByUser(req.user.id);
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

exports.createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    try {
        const task = await taskService.createTask(title, description, dueDate, priority, req.user.id);
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, dueDate, priority, completed } = req.body;
    const taskFields = { title, description, dueDate, priority, completed };
    try {
        const task = await taskService.updateTaskById(req.params.id, taskFields, req.user.id);
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await taskService.deleteTaskById(req.params.id, req.user.id);
        res.json({ msg: 'Task deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};
