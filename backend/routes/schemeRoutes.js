const express = require('express');
const router = express.Router();
const { getSchemes, createScheme, updateScheme, deleteScheme } = require('../controllers/schemeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getSchemes);
router.post('/', protect, authorize('admin'), createScheme);
router.put('/:id', protect, authorize('admin'), updateScheme);
router.delete('/:id', protect, authorize('admin'), deleteScheme);

module.exports = router;
