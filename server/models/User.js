const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentNumber: { type: String, unique: true, sparse: true },
    idNumber: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['student', 'staff', 'admin'], default: 'student' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
