const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Petal = require('./models/Petal');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4323;

// In-memory fallback
let mockItems = [
    { _id: '1', name: 'Silk Ribbon', category: 'Decor', price: 12.50, createdAt: new Date() }
];
let dbConnected = false;

// Connect to MongoDB
connectDB().then((status) => {
    dbConnected = status;
    if (!status) console.log('💡 Running in MOCK MODE (No MongoDB found)');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/items', async (req, res) => {
    try {
        if (dbConnected) {
            const items = await Petal.find().sort({ createdAt: -1 });
            return res.json(items);
        }
        // Fallback
        res.json(mockItems);
    } catch (err) {
        res.status(500).json({ error: err.message, mode: 'mock' });
    }
});

app.post('/api/items', async (req, res) => {
    try {
        if (dbConnected) {
            const newItem = await Petal.create(req.body);
            return res.status(201).json(newItem);
        }
        // Fallback
        const newItem = {
            _id: Date.now().toString(),
            ...req.body,
            createdAt: new Date()
        };
        mockItems.unshift(newItem);
        res.status(201).json(newItem);
    } catch (err) {
        if (dbConnected) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(201).json({ ...req.body, _id: Date.now() }); // Just succeed in mock
        }
    }
});

app.get('/api/status', (req, res) => {
    res.json({ connected: dbConnected });
});

app.listen(PORT, () => {
    console.log(`🌸 Pastel Server blooming on http://localhost:${PORT}`);
    if (!dbConnected) console.log('✨ Mock Mode Enabled: You can test the app without MongoDB!');
});
