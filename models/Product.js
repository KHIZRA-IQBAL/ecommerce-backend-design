const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String},
    price: { type: Number},
    category: { type: String, required: true },
    image: { type: String}, // Jaise: "/cloth/2.jpg"
    description: { type: String },
    discountPrice: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);