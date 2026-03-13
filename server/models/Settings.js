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
        showStars: { type: Boolean, default: true },
    },
    media: {
        backgroundId: { type: String, default: '' },
        heroId: { type: String, default: '' },
    },
    homeStats: {
        count: { type: String, default: '231' },
        label: { type: String, default: 'Luxury Lofts' },
        subCount: { type: String, default: '15%' },
        subLabel: { type: String, default: 'Sharing Options' }
    },
    resFull: { type: Boolean, default: false },
    transportSchedule: { type: String, default: '' }, // Legacy backup
    address: { type: String, default: '@589 Luxury Student Lofts, Thohoyandou, 0950' },
    wifiPasswords: {
        res: { type: String, default: '589@2025' },
        univen: { type: String, default: 'Loftus25@!' }
    },
    transport: {
        baseSchedule: [{
            time: { type: String },
            active: { type: Boolean, default: true }
        }],
        exceptions: [{
            date: { type: String },
            time: { type: String },
            note: { type: String }
        }],
        currentStatus: {
            location: { type: String, default: 'At Residence' },
            estimatedArrival: { type: String, default: 'N/A' },
            message: { type: String, default: '' }
        }
    },
    buildingPictures: [{
        url: { type: String, required: true },
        caption: { type: String, default: '' },
        showOnHome: { type: Boolean, default: false }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
