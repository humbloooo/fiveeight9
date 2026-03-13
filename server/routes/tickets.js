const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { auth, requireAdmin } = require('../middleware/auth');

// Public: Submit a maintenance ticket
router.post('/', async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        const saved = await ticket.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin: Get all tickets
router.get('/', [auth, requireAdmin], async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 });
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Update ticket status
router.patch('/:id', [auth, requireAdmin], async (req, res) => {
    try {
        const updated = await Ticket.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin: Delete ticket
router.delete('/:id', [auth, requireAdmin], async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
