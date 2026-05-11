const Complaint = require('../models/Complaint');
const jwt = require('jsonwebtoken');

// @desc    Register a new complaint
// @route   POST /api/complaints
// @access  Public (or Private depending on auth state)
const registerComplaint = async (req, res) => {
  try {
    const { category, title, description, state, city, priority } = req.body;
    
    // Process file if it exists
    let proofUrl = '';
    if (req.file) {
      proofUrl = `/uploads/${req.file.filename}`;
    }

    let userId = undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        console.error('Invalid token in complaint registration:', err.message);
      }
    }

    const complaint = new Complaint({
      user: userId,
      category,
      title,
      description,
      state,
      city,
      priority,
      proofUrl,
      timeline: [{
        status: 'Submitted',
        remarks: 'Complaint registered successfully'
      }]
    });

    const savedComplaint = await complaint.save();
    
    res.status(201).json({
      success: true,
      message: 'Complaint registered successfully',
      data: savedComplaint
    });
  } catch (error) {
    console.error('Error registering complaint:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get complaint by tracking ID
// @route   GET /api/complaints/:complaintId
// @access  Public
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ complaintId: req.params.complaintId });
    
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get logged in user's complaints
// @route   GET /api/complaints/my-complaints
// @access  Private
const getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error('Error fetching user complaints:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  registerComplaint,
  getComplaintById,
  getUserComplaints,
};
