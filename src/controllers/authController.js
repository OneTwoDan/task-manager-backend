const authService = require('../services/authService.js');
const { handleServerError } = require('../helpers/errorHandler.js');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const token = await authService.registerUser(name, email, password);
        res.json({ token });
    } catch (err) {
        handleServerError(err, res);
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authService.loginUser(email, password);
        res.json({ token });
    } catch (err) {
        handleServerError(err, res);
    }
};
