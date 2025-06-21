const express = require('express');
const router = express.Router();
const { protect, adminOnly, authorizeRoles } = require('../middleware/authMiddleware');

const {
  addBranch,
  addSubject,
  addModule,
  addPreviousYearPaper
} = require('../controllers/syllabusController');


// Admin routes (only accessible by admins)
router.post('/branch', protect, authorizeRoles('admin'), addBranch);
router.post('/subject', protect, authorizeRoles('admin'), addSubject);
router.post('/module/:subjectId', protect, authorizeRoles('admin'), addModule);
router.put(
    '/subject/paper/:subjectId',
    protect,
    adminOnly,
    addPreviousYearPaper
  );
  

module.exports = router;
