const mongoose = require('mongoose');
require('dotenv').config();

const Room = require('../models/Room');
const Amenity = require('../models/Amenity');
const Settings = require('../models/Settings');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing (just in case)
        await Room.deleteMany({});
        await Amenity.deleteMany({});
        await Settings.deleteMany({});

        // Seed Rooms
        const rooms = [
            { title: 'Standard Single', price: 'R4,400 p/m', subtitle: 'Perfect for privacy', description: 'Modern single room with ensuite.', category: 'Ensuite', floor: '1st Floor', available: true, imageUrl: 'https://res.cloudinary.com/dpscc5zqw/image/upload/v1741553530/standard_single.jpg' },
            { title: 'Deluxe Suite', price: 'R5,800 p/m', subtitle: 'Spacious & Luxury', description: 'Large suite with premium views.', category: 'Studio', floor: '3rd Floor', available: true, imageUrl: 'https://res.cloudinary.com/dpscc5zqw/image/upload/v1741553530/deluxe_suite.jpg' }
        ];
        await Room.insertMany(rooms);
        console.log('Seed: Rooms added');

        // Seed Amenities
        const amenities = [
            { title: 'Uncapped Wi-Fi', description: 'High-speed internet throughout.' },
            { title: '24/7 Security', description: 'Always safe and secure.' },
            { title: 'Solar Power', description: 'Backup power for loadshedding.' }
        ];
        await Amenity.insertMany(amenities);
        console.log('Seed: Amenities added');

        // Seed Settings
        const settings = new Settings({
            socialLinks: {
                twitter: { link: 'https://twitter.com/fiveeight9', visible: true },
                instagram: { link: 'https://instagram.com/fiveeight9', visible: true },
                whatsapp: { link: 'https://wa.me/1234567890', visible: true }
            },
            emergencyContacts: {
                reception: '011 123 4567',
                security: '082 000 0000',
                email: 'info@fiveeight9.co.za'
            },
            displayOptions: { showRoomPrices: true }
        });
        await settings.save();
        console.log('Seed: Default settings added');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedData();
