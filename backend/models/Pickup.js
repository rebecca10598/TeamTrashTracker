const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema
({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: 
    {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    timestamp: { type: Date, default: Date.now },
    image: { type: String, default: '' },
    points: { type: Number, default: 10 }
});

module.exports = mongoose.model('Pickup', pickupSchema);
