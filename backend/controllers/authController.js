const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Signup
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ name, email, password });
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { signup, login };