const express = require('express');
const router = express.Router();
const { askChatbot } = require('../controllers/chatbotController');

router.post('/chat', askChatbot);

module.exports = router;
