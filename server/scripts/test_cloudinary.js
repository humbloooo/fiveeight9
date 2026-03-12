const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const API_URL = 'http://localhost:5000/api';
const ASSETS_DIR = path.join(__dirname, '../../ASSETES/BUILING PICTURES');

async function testUpload() {
    console.log('Starting Cloudinary Server-Side Signature Test...');
    
    // 1. Authenticate
    let token;
    try {
        console.log('Authenticating...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: process.env.ADMIN_EMAIL || 'admin@fiveeight9.co.za',
            password: process.env.ADMIN_PASSWORD || 'password123'
        });
        token = loginRes.data.token;
        console.log('Authenticated successfully.');
    } catch (err) {
        console.error('Authentication failed:', err.response?.data || err.message);
        return;
    }

    // 2. Read first image from assets
    const files = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.jpeg') || f.endsWith('.png'));
    if (files.length === 0) {
        console.error('No images found in ASSETES/BUILING PICTURES');
        return;
    }

    const testFile = files[0];
    const filePath = path.join(ASSETS_DIR, testFile);
    console.log(`Testing upload for: ${testFile}`);

    try {
        // Fetch signature from server
        console.log('Fetching signature from server...');
        const signRes = await axios.post(`${API_URL}/upload/sign`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const signData = signRes.data;
        console.log('Signature received.');

        // Post to Cloudinary
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));
        formData.append('api_key', signData.api_key);
        formData.append('timestamp', signData.timestamp);
        formData.append('signature', signData.signature);
        formData.append('folder', signData.folder);

        console.log('Uploading to Cloudinary...');
        const uploadRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${signData.cloud_name}/image/upload`,
            formData,
            { headers: formData.getHeaders() }
        );

        console.log('Upload Success!');
        console.log('URL:', uploadRes.data.secure_url);
    } catch (err) {
        console.error('Test failed:', err.response?.data || err.message);
    }
}

testUpload();
