const express = require('express');
const router = express.Router();
const { getAllUsers, getAllComplaints, updateComplaintStatus } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes here are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.get('/complaints', getAllComplaints);
router.put('/complaints/:id/status', updateComplaintStatus);

module.exports = router;
