const projectService = require('../services/projectService');
const { handleServerError } = require('../helpers/errorHandler');

exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const createdBy = req.user._id;

        const project = await projectService.createProject(name, description, createdBy);

        res.status(201).json(project);
    } catch (error) {
        handleServerError(error, res);
    }
};

exports.manageProjectMembers = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { members } = req.body;

        await projectService.updateProjectMembers(projectId, members, req.user._id);

        res.status(200).json({ message: 'Project members updated successfully' });
    } catch (error) {
        handleServerError(error, res);
    }
};

exports.addTaskToProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, dueDate, priority } = req.body;

        const task = await projectService.addTaskToProject(projectId, title, description, dueDate, priority, req.user._id);

        res.status(201).json(task);
    } catch (error) {
        handleServerError(error, res);
    }
};
