const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const allData = await Product.find(); // Pehle saara data mangwaya

        // Yahan hum suppliers aur baki products ko alag alag kar rahe hain
        const suppliers = allData.filter(item => item.category === "Suppliers");
        const products = allData.filter(item => item.category !== "Suppliers");

        res.render('index', { 
            products: products, 
            suppliers: suppliers // Ab ye 'suppliers' variable yahan majood hai!
        }); 
    } catch (err) {
        console.log(err);
        res.status(500).send("Database Error");
    }
});

router.get('/list', (req, res) => res.render('product-list'));
router.get('/grid', (req, res) => res.render('product-grid'));
router.get('/product', (req, res) => res.render('product-detail'));
router.get('/cart', (req, res) => res.render('cart'));

module.exports = router;