const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session'); // Session ko require kiya
const indexRouter = require('./routes/index');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const app = express();

// 1. Database Connection
connectDB();

// 2. Session Middleware (Taake Cart yaad rahe)
app.use(session({
    secret: 'my-super-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));


// Har page ke liye cart count available karwana
app.use((req, res, next) => {
    res.locals.cartCount = req.session.cart ? req.session.cart.length : 0;
    next();
});

// 3. Form ka data parhne ke liye Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. View Engine Setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 5. Static Files
app.use(express.static(path.join(__dirname, 'public')));

// --- DYNAMIC ROUTES START ---

// [LISTING PAGE]
app.get('/listing', async (req, res) => {
    try {
        const products = await Product.find({ category: "ListingPage" });
        res.render('product-list', { products: products });
    } catch (err) {
        console.error("Listing Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

// [PRODUCT DETAIL PAGE]
app.get('/product-detail', async (req, res) => {
    try {
        const productId = req.query.id;
        const product = await Product.findById(productId);
        
        if (!product) return res.status(404).send("Product not found");

        // Related products (Same category, current wala exclude karke)
        const related = await Product.find({ 
            category: product.category, 
            _id: { $ne: productId } 
        }).limit(6); 

        res.render('product-detail', { 
            product: product, 
            related: related 
        });
    } catch (err) {
        res.status(500).send("Internal Error");
    }
});

// [ADD TO CART LOGIC - POST ROUTE]
app.post('/add-to-cart', (req, res) => {
    const { productId } = req.body;

    // Cart initialization
    if (!req.session.cart) {
        req.session.cart = [];
    }

    // Check if already exists, then push
    if (!req.session.cart.includes(productId)) {
        req.session.cart.push(productId);
        console.log("🛒 Added to cart:", productId);
    }

    res.redirect('/cart'); // Direct cart page pe bhej do
});

// [CART PAGE - DYNAMIC DISPLAY]
app.get('/cart', async (req, res) => {
    try {
        const cartIds = req.session.cart || [];
        
        // 1. Cart ke products
        const productsInCart = await Product.find({ _id: { $in: cartIds } });

        // 2. Save for later ke liye randomly kuch products (jo cart mein NA ho)
        const savedProducts = await Product.find({ _id: { $nin: cartIds } }).limit(4);

        res.render('cart', { 
            products: productsInCart, 
            savedProducts: savedProducts // Naya data bhej rahe hain
        });
    } catch (err) {
        res.status(500).send("Cart Error");
    }
});


app.post('/clear-cart', (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
});


// [REMOVE SINGLE ITEM FROM CART]
app.post('/remove-from-cart', (req, res) => {
    const { productId } = req.body;
    if (req.session.cart) {
        // Sirf us specific ID ko filter out kar do
        req.session.cart = req.session.cart.filter(id => id !== productId);
    }
    res.redirect('/cart');
});



// [GRID PAGE]
app.get('/grid', async (req, res) => {
    try {
        const products = await Product.find({ category: "GridPage" });
        res.render('product-grid', { products: products });
    } catch (err) {
        res.status(500).send("Grid Error");
    }
});

// --- DYNAMIC ROUTES END ---

// Index router (Home page etc.)
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});