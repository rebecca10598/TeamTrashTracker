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
app.use(cors());
app.use(express.json());

// serve uploaded files (static)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// api routes
app.use('/api/users', userRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/upload', uploadRoutes); 
app.use('/api/leaderboard', leaderboardRoutes);

// mongodb connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

