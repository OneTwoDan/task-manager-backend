const authController = require('../src/controllers/authController');
const authService = require('../src/services/authService');
const { handleServerError } = require('../src/helpers/errorHandler');

jest.mock('../src/services/authService');
jest.mock('../src/helpers/errorHandler');

describe('Auth Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
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

    test('should register a new user', async () => {
        const token = 'testToken';
        authService.registerUser.mockResolvedValue(token);

        await authController.registerUser(req, res);

        expect(authService.registerUser).toHaveBeenCalledWith('Test User', 'test@example.com', 'password123');
        expect(res.json).toHaveBeenCalledWith({ token });
    });

    test('should login a user', async () => {
        const token = 'testToken';
        authService.loginUser.mockResolvedValue(token);

        await authController.loginUser(req, res);

        expect(authService.loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(res.json).toHaveBeenCalledWith({ token });
    });

    test('should handle server error in registerUser', async () => {
        const error = new Error('Server error');
        authService.registerUser.mockRejectedValue(error);

        await authController.registerUser(req, res);

        expect(handleServerError).toHaveBeenCalledWith(error, res);
    });

    test('should handle server error in loginUser', async () => {
        const error = new Error('Server error');
        authService.loginUser.mockRejectedValue(error);

        await authController.loginUser(req, res);

        expect(handleServerError).toHaveBeenCalledWith(error, res);
    });
});