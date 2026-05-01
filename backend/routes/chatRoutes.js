const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');
const rateLimit = require('express-rate-limit');

// Rate limit the chat endpoint to prevent abuse
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: { success: false, message: 'Too many requests to the chat assistant. Please try again later.' }
});

router.post('/', handleChat);

module.exports = router;
