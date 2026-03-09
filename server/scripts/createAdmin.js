const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdmin = async () => {
    const email = process.argv[2] || 'admin@fiveeight9.co.za';
    const password = process.argv[3] || 'admin123';

    if (!email || !password) {
        console.log('Usage: node scripts/createAdmin.js <email> <password>');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log('Admin with this email already exists.');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            email,
            password: hashedPassword,
            username: email.split('@')[0], // fallback
            role: 'superadmin'
        });

        await newAdmin.save();
        console.log(`Admin created successfully: ${email}`);
        process.exit(0);
    } catch (err) {
        console.error('Error creating admin:', err);
        process.exit(1);
    }
};

createAdmin();
