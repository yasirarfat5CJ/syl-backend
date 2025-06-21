const Subject = require('../models/subject');

//get modules for a subject
exports.getModulesBySubject= async (req, res) => {
  const { subjectId } = req.params;
  try {
    const subject = await Subject.findById(subjectId).select('modules');
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.status(200).json(subject.modules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch modules', error: err.message });
  }
};

// Update a module
exports.updateModule = async (req, res) => {
    const { title, topics } = req.body;
  
    try {
      const subject = await Subject.findById(req.params.subjectId);
      if (!subject) return res.status(404).json({ msg: 'Subject not found' });
  
      const module = subject.modules.id(req.params.moduleId);
      if (!module) return res.status(404).json({ msg: 'Module not found' });
  
      module.title = title;
      module.topics = topics;
      await subject.save();
  
      res.json(subject.modules);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  };
  
  // Delete a module
  exports.deleteModule = async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.subjectId);
      if (!subject) return res.status(404).json({ msg: 'Subject not found' });
  
      subject.modules.pull({ _id: req.params.moduleId });
      await subject.save();
  
      res.json(subject.modules);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  };