const Subject = require('../models/subject');
const Branch = require('../models/branch');

const getSubjectsByBranchAndYear = async (req, res) => {
  const { branchName, year } = req.params;

  try {
    // Find branch ID by name
    const branch = await Branch.findOne({ name: branchName });

    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Find subjects matching branch ID and year
    try {
      const subjects = await Subject.find({
        branch: decodeURIComponent(branch), // ✅ Handles URL encoding
        year: parseInt(year),               // ✅ Make sure year is a number
      });
  
 
      res.json(subjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  } catch (error) {
    console.error('Error finding branch:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};




// DELETE a subject
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId);
    if (!subject) return res.status(404).json({ msg: 'Subject not found' });

    await subject.deleteOne(); // delete the subject document

    res.json({ msg: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};


module.exports = { getSubjectsByBranchAndYear,deleteSubject };
