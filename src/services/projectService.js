const Project = require('../models/Project');

exports.createProject = async (name, description, createdBy) => {
    const newProject = new Project({ name, description, createdBy });
    return await newProject.save();
};

exports.updateProjectMembers = async (projectId, members, requestingUserId) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new Error('Project not found');
    }

    if (!project.createdBy.equals(requestingUserId)) {
        throw new Error('Permission denied');
    }

    project.members = members;
    return await project.save();
};

exports.addTaskToProject = async (projectId, title, description, dueDate, priority, userId) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new Error('Project not found');
    }

    if (!project.members.some(member => member.user.equals(userId) && member.role !== 'read')) {
        throw new Error('Permission denied');
    }

    const newTask = new Task({
        title,
        description,
        dueDate,
        priority,
        createdBy: userId
    });
    const task = await newTask.save();

    project.tasks.push(task._id);
    await project.save();

    return task;
};
