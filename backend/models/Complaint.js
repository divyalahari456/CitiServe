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
complaintSchema.pre("save", async function () {
  if (!this.complaintId) {
    this.complaintId = `CS-${Date.now()}`;
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
