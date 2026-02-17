const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sruti-w8', {
            serverSelectionTimeoutMS: 2000 // Fast fail
        });
        console.log(`🌸 MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (err) {
        console.error(`❌ Connection Error: ${err.message}`);
        return false;
    }
};

module.exports = connectDB;
