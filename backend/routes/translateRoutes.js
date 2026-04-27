const express = require('express');
const router = express.Router();
const { translateText, translateBatch } = require('../controllers/translateController');

router.post('/', translateText);
router.post('/batch', translateBatch);

module.exports = router;
