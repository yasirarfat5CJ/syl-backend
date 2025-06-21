const Branch = require('../models/branch');
const Subject = require('../models/subject');
const asyncHandler = require('express-async-handler');


// Add a new branch
const addBranch = async (req, res) => {
  try {
    const { name } = req.body;
    const branch = new Branch({ name });
    await branch.save();
    res.status(201).json({ message: 'Branch added successfully', branch });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add branch', error });
  }
};

// Add a new subject to a branch and year/semester
const addSubject = async (req, res) => {
  try {
    const { name, branch, year, semester,code,credits } = req.body;
    const subject = new Subject({ name, branch, year, semester ,code,credits});
    await subject.save();
    res.status(201).json({ message: 'Subject added successfully', subject });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add subject', error });
  }
};

// Add a module to a subject
const addModule = async (req, res) => {
  try {
    const { title, topics } = req.body;
    const subjectId = req.params.subjectId; // ✅ Get from params
    

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const module = { title, topics };
    subject.modules.push(module);
    await subject.save();

    res.status(201).json({ message: 'Module added successfully', module });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add module', error: error.message });
  }
};

// Add previous year papers to a subject


const addPreviousYearPaper = asyncHandler(async (req, res) => {
  const { paperUrl } = req.body;
  const subject = await Subject.findById(req.params.subjectId);

  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  if (!paperUrl) {
    return res.status(400).json({ message: 'paperUrl is required' });
  }
  subject.previousPapers = subject.previousPapers.filter(paper => paper); // removes nulls
  subject.previousPapers.push(paperUrl);
  

  const updatedSubject = await subject.save();

  res.status(200).json({
    message: 'Previous year paper added successfully',
    subject: updatedSubject,
  });
});



module.exports = {
  addBranch,
  addSubject,
  addModule,
  addPreviousYearPaper,
};
