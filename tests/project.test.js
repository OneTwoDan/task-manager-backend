const projectController = require('../src/controllers/projectController');
const projectService = require('../src/services/projectService');
const { handleServerError } = require('../src/helpers/errorHandler');

jest.mock('../src/services/projectService');
jest.mock('../src/helpers/errorHandler');

describe('Project Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { _id: 'userId' },
            params: { projectId: 'projectId' },
            body: {
                name: 'Test Project',
                description: 'Test Description',
                members: ['userId1', 'userId2'],
                title: 'Test Task',
                dueDate: new Date(),
                priority: 'high'
            }
        };

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new project', async () => {
        const project = { name: 'Test Project' };
        projectService.createProject.mockResolvedValue(project);

        await projectController.createProject(req, res);

        expect(projectService.createProject).toHaveBeenCalledWith('Test Project', 'Test Description', 'userId');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(project);
    });

    test('should manage project members', async () => {
        await projectController.manageProjectMembers(req, res);

        expect(projectService.updateProjectMembers).toHaveBeenCalledWith('projectId', ['userId1', 'userId2'], 'userId');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Project members updated successfully' });
    });

    test('should add task to project', async () => {
        const task = { title: 'Test Task' };
        projectService.addTaskToProject.mockResolvedValue(task);

        await projectController.addTaskToProject(req, res);

        expect(projectService.addTaskToProject).toHaveBeenCalledWith('projectId', 'Test Task', 'Test Description', req.body.dueDate, 'high', 'userId');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(task);
    });

    test('should handle server error in createProject', async () => {
        const error = new Error('Server error');
        projectService.createProject.mockRejectedValue(error);

        await projectController.createProject(req, res);

        expect(handleServerError).toHaveBeenCalledWith(error, res);
    });

    test('should handle server error in manageProjectMembers', async () => {
        const error = new Error('Server error');
        projectService.updateProjectMembers.mockRejectedValue(error);

        await projectController.manageProjectMembers(req, res);

        expect(handleServerError).toHaveBeenCalledWith(error, res);
    });

    test('should handle server error in addTaskToProject', async () => {
        const error = new Error('Server error');
        projectService.addTaskToProject.mockRejectedValue(error);

        await projectController.addTaskToProject(req, res);

        expect(handleServerError).toHaveBeenCalledWith(error, res);
    });
});
