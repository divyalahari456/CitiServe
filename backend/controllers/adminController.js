const User = require('../models/User');
const Complaint = require('../models/Complaint');

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    // Fetch complaint counts for each user
    const usersWithStats = await Promise.all(users.map(async (user) => {
      const complaintCount = await Complaint.countDocuments({ user: user._id });
      return { ...user.toObject(), complaintCount };
    }));

    res.status(200).json({ success: true, data: usersWithStats });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all complaints (admin only)
// @route   GET /api/admin/complaints
// @access  Private/Admin
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update complaint status (admin only)
// @route   PUT /api/admin/complaints/:id/status
// @access  Private/Admin
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    complaint.status = status;
    complaint.timeline.push({
      status,
      remarks: remarks || `Status updated to ${status}`
    });

    const updatedComplaint = await complaint.save();
    res.status(200).json({ success: true, data: updatedComplaint });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getAllComplaints,
  updateComplaintStatus
};
