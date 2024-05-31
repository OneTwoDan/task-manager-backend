const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Obtener todas las tareas del usuario
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Crear una nueva tarea
router.post('/', auth, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            user: req.user.id,
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Actualizar una tarea
router.put('/:id', auth, async (req, res) => {
    const { title, description, dueDate, priority, completed } = req.body;
    const taskFields = { title, description, dueDate, priority, completed };
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Eliminar una tarea
router.delete('/:id', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        await Task.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Tarea eliminada' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
