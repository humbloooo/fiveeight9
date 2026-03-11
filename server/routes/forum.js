const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

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
            isAdmin: isAdmin || false
        });
        
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
