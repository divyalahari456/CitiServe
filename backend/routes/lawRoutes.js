const express = require('express');
const router = express.Router();
const { getLaws, getCategories, getLawsByCategory, createLaw, updateLaw, deleteLaw } = require('../controllers/lawController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getLaws);
router.get('/categories', getCategories);
router.get('/category/:categoryName', getLawsByCategory);
router.post('/', protect, authorize('admin'), createLaw);
router.put('/:id', protect, authorize('admin'), updateLaw);
router.delete('/:id', protect, authorize('admin'), deleteLaw);

module.exports = router;
