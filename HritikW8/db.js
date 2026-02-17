const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hritik-w8', {
            serverSelectionTimeoutMS: 2000
        });
        console.log(`🌊 Azure DB Connected: ${conn.connection.host}`);
        return true;
    } catch (err) {
        console.error(`❌ Connection Error: ${err.message}`);
        return false;
    }
};

module.exports = connectDB;
