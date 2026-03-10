const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const jwt = require('jsonwebtoken');

// Middleware to check admin token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

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
router.post('/', auth, async (req, res) => {
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

module.exports = router;
