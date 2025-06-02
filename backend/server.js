const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const pickupRoutes = require('./routes/pickupRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();

const allowedOrigins = 
[
    'http://localhost:5173',
    'https://teamtrashtracker.netlify.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // allowing requests with no origin (postman, curl, mobile apps)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
        return callback(null, true);
        } else {
        return callback(new Error('❌ CORS blocked: Origin not allowed → ' + origin));
        }
    },
    credentials: true // for cookies/auth headers
}));

app.use(express.json());

// serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// api routes
app.use('/api/users', userRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/upload', uploadRoutes); 
app.use('/api/leaderboard', leaderboardRoutes);

// mongodb connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
