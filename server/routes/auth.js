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
    const { email, idNumber } = req.body;

    try {
        // Find user by email (as requested)
        const user = await User.findOne({ email });
        if (!user || user.role !== 'student') {
            return res.status(400).json({ message: 'Invalid credentials or access denied' });
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
                email: user.email,
                role: user.role,
                studentNumber: user.studentNumber,
                roomNumber: user.roomNumber,
                profilePictureUrl: user.profilePictureUrl || ''
            } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current student/user info
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Register new account (Admin only)
router.post('/register', [auth, requireAdmin], async (req, res) => {
    const { username, email, password, role, studentNumber, idNumber, roomNumber } = req.body;

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
            idNumber,
            roomNumber
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

// Update user (Admin only)
router.patch('/users/:id', [auth, requireAdmin], async (req, res) => {
    const { username, email, role, studentNumber, idNumber, roomNumber } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;
        if (studentNumber) user.studentNumber = studentNumber;
        if (roomNumber) user.roomNumber = roomNumber;
        if (req.body.profilePictureUrl !== undefined) user.profilePictureUrl = req.body.profilePictureUrl;
        
        // If ID number is provided, we need to re-hash it as it acts as password for students
        if (idNumber) {
            user.idNumber = idNumber;
            if (user.role === 'student') {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(idNumber, salt);
            }
        }

        await user.save();
        res.json({ message: 'User updated successfully', user: { email: user.email, role: user.role, profilePictureUrl: user.profilePictureUrl } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
