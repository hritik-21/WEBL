const mongoose = require('mongoose');

const PetalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an item name'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Decor', 'Stationery', 'Wellness', 'Other']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0.01, 'Price must be greater than 0']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Petal', PetalSchema);
