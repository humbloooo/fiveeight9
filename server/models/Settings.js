const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    socialLinks: {
        twitter: { link: { type: String, default: '' }, visible: { type: Boolean, default: false } },
        instagram: { link: { type: String, default: '' }, visible: { type: Boolean, default: false } },
        tiktok: { link: { type: String, default: '' }, visible: { type: Boolean, default: false } },
        whatsapp: { link: { type: String, default: '' }, visible: { type: Boolean, default: true } },
        facebook: { link: { type: String, default: '' }, visible: { type: Boolean, default: false } },
        linkedin: { link: { type: String, default: '' }, visible: { type: Boolean, default: false } },
    },
    emergencyContacts: {
        reception: { type: String, default: '' },
        security: { type: String, default: '' },
        emergency: { type: String, default: '' },
        email: { type: String, default: '' },
    },
    displayOptions: {
        showRoomPrices: { type: Boolean, default: true },
    },
    media: {
        backgroundId: { type: String, default: '' },
        heroId: { type: String, default: '' },
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
