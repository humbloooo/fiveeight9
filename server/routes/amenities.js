const express = require('express');
const router = express.Router();
const Amenity = require('../models/Amenity');
const { auth, requireAdmin } = require('../middleware/auth');

// Public: Get all available amenities
router.get('/', async (req, res) => {
    try {
        const filter = req.query.all === 'true' ? {} : { available: { $ne: false } };
        const amenities = await Amenity.find(filter).sort({ createdAt: 1 });
        res.json(amenities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Add/Edit/Remove
router.post('/', [auth, requireAdmin], async (req, res) => {
    const amenity = new Amenity(req.body);
    try {
        const newAmenity = await amenity.save();
        res.status(201).json(newAmenity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', [auth, requireAdmin], async (req, res) => {
    try {
        const updated = await Amenity.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', [auth, requireAdmin], async (req, res) => {
    try {
        await Amenity.findByIdAndDelete(req.params.id);
        res.json({ message: 'Amenity deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
