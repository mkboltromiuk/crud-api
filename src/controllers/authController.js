const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
