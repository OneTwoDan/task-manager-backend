const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    completed: { type: Boolean, default: false },
    tags: [{ type: String }],
    starred: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', TaskSchema);
