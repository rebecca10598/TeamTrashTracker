const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    authId: { type: String, required: true, unique: true },
    displayName: String,
    email: { type: String, required: true, unique: true },
    totalPoints: { type: Number, default: 0 },
    team: { type: String, default: '' },
    badges: { type: [String], default: [] } ,
    lastPickupAt: { type: Date },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },

});

module.exports = mongoose.model('User', userSchema);