const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Amenity = require('../models/Amenity');
const CafeteriaItem = require('../models/CafeteriaItem');
const Settings = require('../models/Settings');
const Setting = require('../models/Setting');
const auth = require('../middleware/auth');

// GET /api/backup
// Generates a full JSON snapshot of the core database
router.get('/', auth, async (req, res) => {
    try {
        // We'll skip Admin/users for security reasons, exporting only content rules/data
        const [rooms, amenities, cafeteria, settings, oldSettings] = await Promise.all([
            Room.find(),
            Amenity.find(),
            CafeteriaItem.find(),
            Settings.find(),
            Setting.find()
        ]);

        const backupData = {
            metadata: {
                timestamp: new Date().toISOString(),
                version: "1.0.0",
                type: "FiveEight9_Full_Export"
            },
            data: {
                rooms,
                amenities,
                cafeteria,
                settings: settings.length > 0 ? settings : oldSettings
            }
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="fiveeight9_backup_${Date.now()}.json"`);
        res.status(200).send(JSON.stringify(backupData, null, 2));

    } catch (error) {
        console.error('Backup Generation Error:', error);
        res.status(500).json({ message: 'Failed to generate database backup' });
    }
});

module.exports = router;
