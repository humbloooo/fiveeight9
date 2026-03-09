const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    icon: { type: String }, // Store the Lucide icon name or SVG path
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Amenity', AmenitySchema);
