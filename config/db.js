const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Ab hum variable ki jagah process.env use karenge
        const atlasURL = process.env.MONGO_URI; 
        
        await mongoose.connect(atlasURL);
        console.log("Fresh MongoDB Atlas Connected... ☁️✅");
    } catch (err) {
        console.error("Database Connection Failed! ❌", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;