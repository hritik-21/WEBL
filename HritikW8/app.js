const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Discovery = require('./models/Discovery');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4324;

let mockData = [
    { _id: '1', name: 'Azure Whale', depth: 400, zone: 'Twilight', createdAt: new Date() }
];
let dbConnected = false;

connectDB().then(status => {
    dbConnected = status;
    if (!status) console.log('🛡️ Running in AZURE MOCK MODE');
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/discoveries', async (req, res) => {
    try {
        if (dbConnected) {
            const data = await Discovery.find().sort({ createdAt: -1 });
            return res.json(data);
        }
        res.json(mockData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/discoveries', async (req, res) => {
    try {
        if (dbConnected) {
            const newData = await Discovery.create(req.body);
            return res.status(201).json(newData);
        }
        const newData = { _id: Date.now().toString(), ...req.body, createdAt: new Date() };
        mockData.unshift(newData);
        res.status(201).json(newData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/status', (req, res) => {
    res.json({ connected: dbConnected });
});

app.listen(PORT, () => {
    console.log(`🌊 Azure Abyss active on http://localhost:${PORT}`);
});
