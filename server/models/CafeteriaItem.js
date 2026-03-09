const mongoose = require('mongoose');

const CafeteriaItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Breakfast', 'Lunch', 'Snack', 'Drink'], default: 'Lunch' },
    price: { type: Number, required: true },
    description: { type: String },
    inStock: { type: Boolean, default: true },
    inventoryCount: { type: Number, default: 0 },
    imageUrl: { type: String },
    imagePublicId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CafeteriaItem', CafeteriaItemSchema);
