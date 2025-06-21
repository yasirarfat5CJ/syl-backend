const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');
const { updateModule, deleteModule,getModulesBySubject } = require('../controllers/moduleController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Get all modules of a subject
router.get('/modules/subject/:subjectId', getModulesBySubject);
// Update a module
router.put('/modules/subject/:subjectId/modules/:moduleId', protect, adminOnly, updateModule);

// Delete a module
router.delete('/modules/subject/:subjectId/modules/:moduleId', protect, adminOnly, deleteModule);
module.exports = router;
