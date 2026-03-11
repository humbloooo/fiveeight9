const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    detailedDesc: { type: String },
    icon: { type: String }, // Store the Lucide icon name or SVG path
    media: [{ type: String }], // Array of image URLs
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Amenity', AmenitySchema);
