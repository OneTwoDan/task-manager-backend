const Task = require('../models/Task');

exports.getTasksByUser = async (userId) => {
    try {
        const tasks = await Task.find({ user: userId }).sort({ date: -1 });
        return tasks;
    } catch (err) {
        throw new Error('Server error');
    }
};

exports.createTask = async (title, description, dueDate, priority, userId) => {
    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            user: userId,
        });
        const task = await newTask.save();
        return task;
    } catch (err) {
        throw new Error('Server error');
    }
};

exports.updateTaskById = async (taskId, taskFields, userId) => {
    try {
        let task = await Task.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        if (task.user.toString() !== userId) {
            throw new Error('Not authorized');
        }
        task = await Task.findByIdAndUpdate(taskId, { $set: taskFields }, { new: true });
        return task;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.deleteTaskById = async (taskId, userId) => {
    try {
        let task = await Task.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        if (task.user.toString() !== userId) {
            throw new Error('Not authorized');
        }
        await Task.findByIdAndDelete(taskId);
    } catch (err) {
        throw new Error(err.message);
    }
};
