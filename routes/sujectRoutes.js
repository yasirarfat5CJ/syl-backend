const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');
const Branch = require('../models/branch');
const { deleteSubject } = require('../controllers/subjectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
// GET /api/subjects/:branch/:year
router.get("/subjects/:branch/:year", async (req, res) => {
  try {
    const { branch, year } = req.params;
    const numyear = parseInt(year);

    // First, find the branch by name
    const foundBranch = await Branch.findOne({
      name: { $regex: new RegExp(branch, 'i') }
    });

    if (!foundBranch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Then, find subjects that belong to that branch ID
    const subjects = await Subject.find({
      branch: foundBranch._id,
      year: numyear
    });

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: "No subjects found for this branch and year." });
    }

    res.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Failed to fetch subjects", error: error.message });
  }
});

router.delete('/subject/:subjectId', protect, adminOnly, deleteSubject);
module.exports = router;
