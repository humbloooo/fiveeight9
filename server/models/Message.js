const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    likes: [{ type: String }] // Store user identifiers or counts
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
