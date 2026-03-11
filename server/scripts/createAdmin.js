const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const User = require('../models/User');

const createOrUpdateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        const email = 'admin@fiveeight9.co.za';
        const passwordPlain = 'password123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordPlain, salt);

        // Check if user exists
        let adminUser = await User.findOne({ email });

        if (adminUser) {
            console.log('Admin user found. Updating password...');
            adminUser.password = hashedPassword;
            adminUser.role = 'admin';
            await adminUser.save();
            console.log(`Updated credentials for ${email}`);
        } else {
            console.log('Admin user not found. Creating new admin...');
            adminUser = new User({
                username: 'Administrator',
                email: email,
                password: hashedPassword,
                role: 'admin'
            });
            await adminUser.save();
            console.log(`Created new admin user: ${email}`);
        }

        console.log('Done!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

createOrUpdateAdmin();
