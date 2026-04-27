const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for now if not authenticated
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  status: { type: String, enum: ['Submitted', 'Under Review', 'Assigned', 'Resolved', 'Closed', 'Rejected'], default: 'Submitted' },
  timeline: [{
    status: { type: String, enum: ['Submitted', 'Under Review', 'Assigned', 'Resolved', 'Closed', 'Rejected'] },
    timestamp: { type: Date, default: Date.now },
    remarks: { type: String }
  }],
  proofUrl: { type: String }
}, { timestamps: true });

// Pre-save hook to generate unique complaint ID
complaintSchema.pre('save', function(next) {
  if (!this.complaintId) {
    // Generate an ID like: CITI-2026-A8B9C
    const year = new Date().getFullYear();
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.complaintId = `CITI-${year}-${randomStr}`;
  }
  next();
});

module.exports = mongoose.model('Complaint', complaintSchema);
