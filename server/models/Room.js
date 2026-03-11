const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, default: 'R4,400 p/m' },
    subtitle: { type: String },
    category: { type: String, default: 'Single Room' },
    nsfas: { type: Boolean, default: true },
    floor: {
        type: String,
        enum: ['Basement', 'Ground Floor', '1st Floor', 'Second Floor', '3rd Floor'],
        default: 'Ground Floor'
    },
    available: { type: Boolean, default: true },
    imageUrl: { type: String },
    imagePublicId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
