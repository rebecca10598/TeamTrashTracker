const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createPickup, getPickups } = require('../controllers/pickupController');

router.post('/', authMiddleware, createPickup); // POST requires auth — create pickup

router.get('/', getPickups); // Public GET — fetch all pickups

module.exports = router;

