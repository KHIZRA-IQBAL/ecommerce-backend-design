const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Aapka updated link password ke sath
        const atlasURL = "mongodb+srv://admin:admin123@ecommerce-project.4gpynmv.mongodb.net/ecommerce_db?retryWrites=true&w=majority&appName=Ecommerce-Project";
        
        await mongoose.connect(atlasURL);
        console.log("Fresh MongoDB Atlas Connected... ☁️✅");
    } catch (err) {
        console.error("Database Connection Failed! ❌", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;