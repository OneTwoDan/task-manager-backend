const authService = require('../services/authService.js');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const token = await authService.registerUser(name, email, password);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authService.loginUser(email, password);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};
