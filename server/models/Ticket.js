const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    issueType: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    roomNumber: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
    submittedBy: { type: String, default: 'Anonymous' },
    studentNumber: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
