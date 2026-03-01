const mongoose = require('mongoose');
const Product = require('./models/Product');

const atlasURL = "mongodb+srv://admin:admin123@ecommerce-project.4gpynmv.mongodb.net/ecommerce_db?retryWrites=true&w=majority&appName=Ecommerce-Project";

mongoose.connect(atlasURL)
    .then(async () => {
        console.log("Database connected. Cleaning old data...");
        await Product.deleteMany({}); 

        const seedData = [
            // --- RECOMMENDED (10 Items) ---
            { title: "T-shirts with multiple colors, for men", price: 10.30, category: "Recommended", image: "/cloth/shirt.png", description: "Comfortable cotton t-shirt" },
            { title: "Jeans shorts for men blue color", price: 10.30, category: "Recommended", image: "/cloth/jacket.jpg", description: "Stylish blue denim shorts" },
            { title: "Brown winter coat medium size", price: 12.50, category: "Recommended", image: "/cloth/suit.jpg", description: "Warm winter coat" },
            { title: "Jeans bag for travel for men", price: 34.00, category: "Recommended", image: "/cloth/wallet-blue.jpg", description: "Durable travel bag" },
            { title: "Leather wallet", price: 99.00, category: "Recommended", image: "/cloth/bag.jpg", description: "Genuine leather wallet" },
            { title: "Canon camera black, 100x zoom", price: 9.99, category: "Recommended", image: "/cloth/jeans.jpg", description: "High resolution camera" },
            { title: "Headset for gaming with mic", price: 8.99, category: "Recommended", image: "/tech/headset.jpg", description: "High quality gaming headset" },
            { title: "Smartwatch silver color modern", price: 10.30, category: "Recommended", image: "/tech/smartwatch.jpg", description: "Modern smartwatch with silver strap" },
            { title: "Blue wallet for men leather material", price: 10.30, category: "Recommended", image: "/interior/pot-blue.jpg", description: "Elegant blue leather wallet" },
            { title: "Jeans bag for travel for men", price: 80.95, category: "Recommended", image: "/tech/kettle-black.jpg", description: "Durable travel bag for men" },

            // --- HOME AND OUTDOOR (8 Items) ---
            { title: "Soft chairs", price: 19, category: "HomeOutdoor", image: "/interior/chair.jpg" },
            { title: "Sofa & chair", price: 19, category: "HomeOutdoor", image: "/interior/sofa.jpg" },
            { title: "Kitchen dishes", price: 19, category: "HomeOutdoor", image: "/interior/dishes.jpg" },
            { title: "Smart watches", price: 19, category: "HomeOutdoor", image: "/interior/pot-blue.jpg" },
            { title: "Kitchen mixer", price: 100, category: "HomeOutdoor", image: "/interior/mixer.jpg" },
            { title: "Blenders", price: 39, category: "HomeOutdoor", image: "/interior/blender.jpg" },
            { title: "Home appliance", price: 19, category: "HomeOutdoor", image: "/interior/appliance.jpg" },
            { title: "Coffee maker", price: 10, category: "HomeOutdoor", image: "/interior/coffee.jpg" },

            // --- CONSUMER ELECTRONICS (8 Items) ---
            { title: "Smart watches", price: 19, category: "Electronics", image: "/tech/smartwatch.jpg" },
            { title: "Cameras", price: 89, category: "Electronics", image: "/tech/camera.jpg" },
            { title: "Headphones", price: 10, category: "Electronics", image: "/tech/headset.jpg" },
            { title: "Smart watches", price: 90, category: "Electronics", image: "/tech/kettle-black.jpg" },
            { title: "Gaming set", price: 35, category: "Electronics", image: "/tech/gaming.jpg" },
            { title: "Laptops & PC", price: 340, category: "Electronics", image: "/tech/laptop.jpg" },
            { title: "Smartphones", price: 19, category: "Electronics", image: "/tech/smartphone.jpg" },
            { title: "Electric kettle", price: 240, category: "Electronics", image: "/tech/Phone.jpg" },

            // --- DEALS AND OFFERS (5 Items) ---
            { title: "Smart watches", price: 100, category: "Deals", image: "/tech/smartwatch.jpg", discountPrice: 25 },
            { title: "Laptops", price: 800, category: "Deals", image: "/tech/laptop.jpg", discountPrice: 15 },
            { title: "GoPro cameras", price: 300, category: "Deals", image: "/tech/camera.jpg", discountPrice: 40 },
            { title: "Headphones", price: 50, category: "Deals", image: "/tech/gaming.jpg", discountPrice: 25 },
            { title: "Canon cameras", price: 500, category: "Deals", image: "/tech/camera2.jpg", discountPrice: 25 },

            // --- PRODUCT LISTING PAGE EXCLUSIVE (8 Items for Figma Match) ---
            { title: "Canon Camera EOS 2000, Black 10x zoom", price: 998.00, discountPrice: 1128.00, category: "ListingPage", image: "/tech/Phone.jpg", description: "Canon EOS 2000D / Rebel T7 DSLR Camera Body with 18-55mm Lens, perfect for photography enthusiasts." },
            { title: "GoPro HERO6 4K Action Camera - Black", price: 799.00, category: "ListingPage", image: "/tech/camera2.jpg", description: "Rugged and waterproof action camera with advanced video stabilization and crystal clear 4K video." },
            { title: "Xiaomi Mi Pad 4 WiFi Tablet - 4GB RAM", price: 899.00, category: "ListingPage", image: "/tech/smartphone.jpg", description: "Compact tablet with high-performance 4GB RAM and beautiful display for media and games." },
            { title: "HP EliteBook Business Laptop - Silver", price: 1200.00, category: "ListingPage", image: "/tech/laptop.jpg", description: "Premium business laptop with 16GB RAM and 512GB SSD for professional performance." },
            { title: "Smartwatch Series 4 Gold Aluminum Case", price: 998.00, discountPrice: 1128.00, category: "ListingPage", image: "/tech/smartwatch.jpg", description: "Stylish smartwatch with heart rate monitoring, GPS, and a beautiful gold finish." },
            { title: "Logitech MX Master 3 Wireless Mouse", price: 99.00, category: "ListingPage", image: "/tech/headset.jpg", description: "Advanced wireless mouse with ultra-fast scrolling and ergonomic design for creators." },

            // --- EXTRA SERVICES (4 Items) ---
            { title: "Source from <br> Industry Hubs", category: "Services", image: "/service1.png", description: "fas fa-search" },
            { title: "Customize your <br> products", category: "Services", image: "/service2.png", description: "fas fa-archive" },
            { title: "Fast, reliable shipping <br> ocean or air", category: "Services", image: "/service3.png", description: "fas fa-plane" },
            { title: "Product monitoring <br> and inspection", category: "Services", image: "/service4.png", description: "fas fa-shield-alt" },

            // --- SUPPLIERS BY REGION (10 Items) ---
            { title: "Arabic Emirates", description: "shopname.ae", image: "/uae.png", category: "Suppliers" },
            { title: "Australia", description: "shopname.ae", image: "/aus.png", category: "Suppliers" },
            { title: "United States", description: "shopname.ae", image: "/usa.png", category: "Suppliers" },
            { title: "Russia", description: "shopname.ru", image: "/rus.png", category: "Suppliers" },
            { title: "Italy", description: "shopname.it", image: "/ita.png", category: "Suppliers" },
            { title: "Denmark", description: "denmark.com.dk", image: "/den.png", category: "Suppliers" },
            { title: "France", description: "shopname.com.fr", image: "/fra.png", category: "Suppliers" },
            { title: "China", description: "shopname.ae", image: "/chn.png", category: "Suppliers" },
            { title: "Great Britain", description: "shopname.co.uk", image: "/gbr.png", category: "Suppliers" },

   // --- GRID PAGE PRODUCTS (Electronics) ---
            {
                title: 'iPhone 12 Pro Max Silver - 256GB',
                price: 99.50,
                image: '/tech/Phone.jpg',
                category: 'GridPage',
                description: 'High-quality smartphone with amazing camera features.'
            },
            {
                title: 'Canon EOS 2000D DSLR Camera',
                price: 99.50,
                image: '/tech/Phone2.jpg',
                category: 'GridPage',
                description: 'Professional DSLR camera for photography enthusiasts.'
            },
            {
                title: 'Xiaomi Mi Pad 4 WiFi Tablet',
                price: 80.00,
                image: '/tech/camera2.jpg',
                category: 'GridPage',
                description: 'Compact and powerful tablet for work and play.'
            },
            {
                title: 'HP EliteBook Business Laptop',
                price: 150.00,
                image: '/tech/smartphone.jpg',
                category: 'GridPage',
                description: 'Powerful laptop for business and professional use.'
            },
            {
                title: 'Sony Wireless Headphones White',
                price: 45.00,
                image: '/tech/headset.jpg',
                category: 'GridPage',
                description: 'Noise-cancelling wireless headphones with deep bass.'
            },
            {
                title: 'Smartwatch Series 4 Gold Edition',
                price: 99.50,
                image: '/tech/Phone.jpg',
                category: 'GridPage',
                description: 'Stylish smartwatch with health tracking features.'
            }
        ];

        await Product.insertMany(seedData);
        console.log("Figma Products Seeded Successfully! 🌱");
        process.exit();
    })
    .catch(err => {
        console.log("Error seeding data:", err);
        process.exit(1);
    });