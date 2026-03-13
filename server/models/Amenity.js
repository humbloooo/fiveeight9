const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },  // was 'desc' — renamed to match frontend
    detailedDesc: { type: String },
    icon: { type: String },          // Lucide icon name
    media: [{ type: String }],       // Gallery image URLs
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Amenity', AmenitySchema);

