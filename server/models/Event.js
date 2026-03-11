const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String },
    location: { type: String },
    description: { type: String },
    category: { type: String, default: 'General' },
    imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
