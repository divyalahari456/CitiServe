const express = require('express');
const router = express.Router();
const { getSchemes, createScheme, updateScheme, deleteScheme } = require('../controllers/schemeController');

router.get('/', getSchemes);
router.post('/', createScheme);
router.put('/:id', updateScheme);
router.delete('/:id', deleteScheme);

module.exports = router;
