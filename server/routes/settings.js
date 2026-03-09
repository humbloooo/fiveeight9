const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const auth = require('../middleware/auth');

// Public: Get all settings
router.get('/', async (req, res) => {
    try {
        const settings = await Setting.find();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Upsert setting
router.post('/', auth, async (req, res) => {
    const { key, value, description } = req.body;
    try {
        const setting = await Setting.findOneAndUpdate(
            { key },
            { value, description },
            { upsert: true, new: true }
        );
        res.json(setting);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
