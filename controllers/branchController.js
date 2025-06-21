// controllers/branchController.js
const Branch = require('../models/branch');

// GET /api/branches
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find({});
    res.status(200).json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ message: 'Server Error: Unable to fetch branches' });
  }
};

module.exports = {
  getAllBranches,
};
