const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { registerComplaint, getComplaintById } = require('../controllers/complaintController');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post('/', upload.single('proofFile'), registerComplaint);
router.get('/:complaintId', getComplaintById);

module.exports = router;
