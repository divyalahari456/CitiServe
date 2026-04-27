const Law = require('../models/Law');

// @desc    Get all laws
// @route   GET /api/laws
// @access  Public
const getLaws = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const laws = await Law.find(query).sort({ category: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: laws.length, data: laws });
  } catch (error) {
    console.error('Error fetching laws:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get distinct categories
// @route   GET /api/laws/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Law.distinct('category');
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get laws by category
// @route   GET /api/laws/category/:categoryName
// @access  Public
const getLawsByCategory = async (req, res) => {
  try {
    const laws = await Law.find({ category: req.params.categoryName }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: laws.length, data: laws });
  } catch (error) {
    console.error('Error fetching laws by category:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a new law
// @route   POST /api/laws
// @access  Admin
const createLaw = async (req, res) => {
  try {
    const law = await Law.create(req.body);
    res.status(201).json({ success: true, data: law });
  } catch (error) {
    console.error('Error creating law:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update a law
// @route   PUT /api/laws/:id
// @access  Admin
const updateLaw = async (req, res) => {
  try {
    const law = await Law.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!law) return res.status(404).json({ success: false, message: 'Law not found' });
    res.status(200).json({ success: true, data: law });
  } catch (error) {
    console.error('Error updating law:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a law
// @route   DELETE /api/laws/:id
// @access  Admin
const deleteLaw = async (req, res) => {
  try {
    const law = await Law.findByIdAndDelete(req.params.id);
    if (!law) return res.status(404).json({ success: false, message: 'Law not found' });
    res.status(200).json({ success: true, message: 'Law deleted' });
  } catch (error) {
    console.error('Error deleting law:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getLaws, getCategories, getLawsByCategory, createLaw, updateLaw, deleteLaw };
