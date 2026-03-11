const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const Room = require('../models/Room');
const Amenity = require('../models/Amenity');
const CafeteriaItem = require('../models/CafeteriaItem');
const jwt = require('jsonwebtoken');

const { auth, requireAdmin } = require('../middleware/auth');

// @route   GET api/settings
// @desc    Get all site settings
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            // Create default settings if none exist
            settings = new Settings();
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/settings
// @desc    Update site settings
router.post('/', [auth, requireAdmin], async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (settings) {
            settings = await Settings.findOneAndUpdate(
                {},
                { $set: req.body },
                { new: true }
            );
        } else {
            settings = new Settings(req.body);
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/settings/factory-reset
// @desc    Clear all operational data for a new deployment
router.delete('/factory-reset', [auth, requireAdmin], async (req, res) => {
    try {
        await Promise.all([
            Room.deleteMany({}),
            Amenity.deleteMany({}),
            CafeteriaItem.deleteMany({})
        ]);
        res.json({ msg: 'Factory reset complete' });
    } catch (err) {
        console.error('Factory reset failed:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
