const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { auth } = require('../middleware/auth');

// Get recent messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 }).limit(100);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a new message
router.post('/messages', async (req, res) => {
    try {
        const { user, text, time, isAdmin } = req.body;
        
        if (!text || !text.trim()) {
            return res.status(400).json({ message: 'Message text is required' });
        }

        const newMessage = new Message({
            user: user || 'Anonymous',
            text: text,
            time: time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isAdmin: isAdmin || false,
            likes: []
        });
        
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Like a message
router.post('/messages/:id/like', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(401).json({ message: 'Login required to like' });

        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        const index = message.likes.indexOf(userId);
        if (index === -1) {
            message.likes.push(userId);
        } else {
            message.likes.splice(index, 1);
        }

        await message.save();
        res.json(message);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit message (Admin only)
router.patch('/messages/:id', auth, async (req, res) => {
    try {
        if (!req.user.role === 'admin') return res.status(403).json({ message: 'Admin only' });
        const message = await Message.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
        res.json(message);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete message (Admin only)
router.delete('/messages/:id', auth, async (req, res) => {
    try {
        if (!req.user.role === 'admin') return res.status(403).json({ message: 'Admin only' });
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
