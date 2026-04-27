const express = require('express');
const router = express.Router();
const { getLaws, getCategories, getLawsByCategory, createLaw, updateLaw, deleteLaw } = require('../controllers/lawController');

router.get('/', getLaws);
router.get('/categories', getCategories);
router.get('/category/:categoryName', getLawsByCategory);
router.post('/', createLaw);
router.put('/:id', updateLaw);
router.delete('/:id', deleteLaw);

module.exports = router;
