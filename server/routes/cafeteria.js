const express = require('express');
const router = express.Router();
const CafeteriaItem = require('../models/CafeteriaItem');
const auth = require('../middleware/auth');

// Public: Get all menu items
router.get('/', async (req, res) => {
    try {
        const items = await CafeteriaItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Add/Edit/Remove
router.post('/', auth, async (req, res) => {
    const item = new CafeteriaItem(req.body);
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', auth, async (req, res) => {
    try {
        const updated = await CafeteriaItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await CafeteriaItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
