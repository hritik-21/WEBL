const mongoose = require('mongoose');

const DiscoverySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Discovery name required'],
        trim: true
    },
    depth: {
        type: Number,
        required: [true, 'Depth required (meters)'],
        min: 0
    },
    zone: {
        type: String,
        required: true,
        enum: ['Sunlight', 'Twilight', 'Midnight', 'Abyss']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Discovery', DiscoverySchema);
