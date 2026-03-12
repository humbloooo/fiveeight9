const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, requireAdmin } = require('../middleware/auth');

// Admin Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Student Login
router.post('/student-login', async (req, res) => {
    const { studentNumber, idNumber } = req.body;

    try {
        // Find user by student number
        const user = await User.findOne({ studentNumber });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if ID number matches (acting as password for students)
        const isMatch = await bcrypt.compare(idNumber, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            token, 
            user: { 
                username: user.username, 
                role: user.role,
                studentNumber: user.studentNumber 
            } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Register new account (Admin only)
router.post('/register', [auth, requireAdmin], async (req, res) => {
    const { username, email, password, role, studentNumber, idNumber } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        // If it's a student, the idNumber is their "password"
        const passwordToHash = role === 'student' ? idNumber : password;
        const hashedPassword = await bcrypt.hash(passwordToHash, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'student',
            studentNumber,
            idNumber
        });

        await user.save();
        res.json({ message: 'Account created successfully', user: { email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users (Admin only)
router.get('/users', [auth, requireAdmin], async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete user (Admin only)
router.delete('/users/:id', [auth, requireAdmin], async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
