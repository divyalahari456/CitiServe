const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  benefits: { type: String, required: true },
  targetRoles: [{ type: String }],
  maxIncome: { type: Number },
  gender: { type: String },
  maxAge: { type: Number },
  link: { type: String },
  source: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);
