const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { auth, requireAdmin } = require('../middleware/auth');

// Backend is already configured in index.js, but ensure it's correct
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Admin: Get signature for frontend upload
router.post('/sign', [auth, requireAdmin], (req, res) => {
    try {
        const timestamp = Math.round((new Date()).getTime() / 1000);
        const folder = 'fiveeight9';
        
        const paramsToSign = {
            timestamp: timestamp,
            folder: folder
        };

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET
        );

        res.json({
            signature,
            timestamp,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            folder
        });
    } catch (err) {
        res.status(500).json({ message: 'Signature generation failed', error: err.message });
    }
});

module.exports = router;
