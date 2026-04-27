const Scheme = require('../models/Scheme');

// @desc    Get all schemes (with optional filtering)
// @route   GET /api/schemes
// @access  Public
const getSchemes = async (req, res) => {
  try {
    const { role, income, gender, age, search } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { eligibility: { $regex: search, $options: 'i' } }
      ];
    }

    let schemes = await Scheme.find(query).sort({ createdAt: -1 });

    // Client-side-style filtering applied on the fetched results
    if (role && role !== 'Other') {
      schemes = schemes.filter(s => s.targetRoles.includes(role));
    }

    if (income) {
      schemes = schemes.filter(s => !s.maxIncome || parseInt(income) <= s.maxIncome);
    }

    if (gender) {
      schemes = schemes.filter(s => !s.gender || s.gender === gender);
    }

    if (age) {
      schemes = schemes.filter(s => !s.maxAge || parseInt(age) <= s.maxAge);
    }

    res.status(200).json({ success: true, count: schemes.length, data: schemes });
  } catch (error) {
    console.error('Error fetching schemes:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a new scheme
// @route   POST /api/schemes
// @access  Admin
const createScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);
    res.status(201).json({ success: true, data: scheme });
  } catch (error) {
    console.error('Error creating scheme:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update a scheme
// @route   PUT /api/schemes/:id
// @access  Admin
const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!scheme) return res.status(404).json({ success: false, message: 'Scheme not found' });
    res.status(200).json({ success: true, data: scheme });
  } catch (error) {
    console.error('Error updating scheme:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a scheme
// @route   DELETE /api/schemes/:id
// @access  Admin
const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) return res.status(404).json({ success: false, message: 'Scheme not found' });
    res.status(200).json({ success: true, message: 'Scheme deleted' });
  } catch (error) {
    console.error('Error deleting scheme:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getSchemes, createScheme, updateScheme, deleteScheme };
