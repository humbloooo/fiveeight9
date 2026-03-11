const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { auth, requireAdmin } = require('../middleware/auth');

// @route   GET api/events
// @desc    Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/events
// @desc    Create an event
router.post('/', [auth, requireAdmin], async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PATCH api/events/:id
// @desc    Update an event
router.patch('/:id', [auth, requireAdmin], async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(event);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/events/:id
// @desc    Delete an event
router.delete('/:id', [auth, requireAdmin], async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Event removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
