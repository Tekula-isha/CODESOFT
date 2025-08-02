require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/Product'); 

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- API Routes ---

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Seed data (Optional: for testing, run once then comment out)
app.get('/api/seed', async (req, res) => {
    try {
        await Product.deleteMany({}); // Clear existing products
        const products = [
            {
                name: 'Wireless Bluetooth Headphones',
                description: 'High-quality sound with comfortable design.',
                price: 79.99,
                image: 'https://via.placeholder.com/200/FF5733/FFFFFF?text=Headphones', // Placeholder
                category: 'Electronics',
                countInStock: 10
            },
            {
                name: 'Smartwatch Fitness Tracker',
                description: 'Track your steps, heart rate, and notifications.',
                price: 129.99,
                image: 'https://via.placeholder.com/200/33FF57/FFFFFF?text=Smartwatch', // Placeholder
                category: 'Electronics',
                countInStock: 15
            },
            {
                name: 'Ergonomic Office Chair',
                description: 'Comfortable and supportive chair for long working hours.',
                price: 249.00,
                image: 'https://via.placeholder.com/200/3366FF/FFFFFF?text=Office+Chair', // Placeholder
                category: 'Home Goods',
                countInStock: 5
            },
            {
                name: 'Coffee Machine',
                description: 'Brew delicious coffee at home with ease.',
                price: 89.50,
                image: 'https://via.placeholder.com/200/FF33FF/FFFFFF?text=Coffee+Machine', // Placeholder
                category: 'Home Goods',
                countInStock: 8
            }
        ];
        await Product.insertMany(products);
        res.json({ message: 'Database seeded with sample products!' });
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).json({ message: 'Server error during seeding' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});