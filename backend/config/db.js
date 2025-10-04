const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB se connection ho gaya hai!');
    } catch (error) {
        console.error('MongoDB se connect karne mein error:', error);
        process.exit(1); // Agar connection fail ho jaye to process ko exit kar dein
    }
};

module.exports = connectDB;
           