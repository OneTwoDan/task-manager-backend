const taskController = require('../src/controllers/taskController');
const taskService = require('../src/services/taskService');
const { handleServerError } = require('../src/helpers/errorHandler');

jest.mock('../src/services/taskService');
jest.mock('../src/helpers/errorHandler');

describe('Task Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { id: 'userId' },
            params: { id: 'taskId' },
            body: {
                title: 'Test Task',
                description: 'Test Description',
                dueDate: new Date(),
                priority: 'high',
                completed: false
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

    test('should get tasks by user ID', async () => {
        const tasks = [{ title: 'Test Task' }];
        taskService.getTasksByUser.mockResolvedValue(tasks);

        await taskController.getTasks(req, res);

        expect(taskService.getTasksByUser).toHaveBeenCalledWith('userId');
        expect(res.json).toHaveBeenCalledWith(tasks);
    });

    test('should create a new task', async () => {
        const task = { title: 'Test Task' };
        taskService.createTask.mockResolvedValue(task);

        await taskController.createTask(req, res);

        expect(taskService.createTask).toHaveBeenCalledWith('Test Task', 'Test Description', req.body.dueDate, 'high', 'userId');
        expect(res.json).toHaveBeenCalledWith(task);
    });

    test('should update a task by ID', async () => {
        const task = { title: 'Updated Task' };
        taskService.updateTaskById.mockResolvedValue(task);

        await taskController.updateTask(req, res);

        expect(taskService.updateTaskById).toHaveBeenCalledWith('taskId', {
            title: 'Test Task',
            description: 'Test Description',
            dueDate: req.body.dueDate,
            priority: 'high',
            completed: false
        }, 'userId');
        expect(res.json).toHaveBeenCalledWith(task);
    });

    test('should delete a task by ID', async () => {
        taskService.deleteTaskById.mockResolvedValue();

        await taskController.deleteTask(req, res);

        expect(taskService.deleteTaskById).toHaveBeenCalledWith('taskId', 'userId');
        expect(res.json).toHaveBeenCalledWith({ msg: 'Task deleted' });
    });

    test('should handle server error in getTasks', async () => {
        const error = new Error('Server error');
        taskService.getTasksByUser.mockRejectedValue(error);

        await taskController.getTasks(req, res);

        expect(handleServerError).toHaveBeenCalledWith(error, res);
    });
});
