const express = require('express');
const router = express.Router();
const { getOrCreateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, getOrCreateUser);

module.exports = router;
