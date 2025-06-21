// routes/branchRoutes.js
const express = require('express');
const router = express.Router();
const { getAllBranches } = require('../controllers/branchController');

// Public route to fetch all branches
router.get('/', getAllBranches);

module.exports = router;
