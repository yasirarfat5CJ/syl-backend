const mongoose = require('mongoose');

// Define the module schema for each subject
const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Module title (e.g., "Module 1")
  topics: [{ type: String }]  // Array of topics (e.g., ["Stacks", "Queues", "Linked List"])
});

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },  // Reference to the Branch model
  year: { type: Number, required: true },        // 1st to 4th year
  semester: { type: Number, required: true }, 
  code: { type: String, required: true },
  credits: { type: Number, required: true },    // 
  previousPapers: [{ type: String }],             // Array of paper links or file names
  modules: [moduleSchema]  // Array of modules (5 modules per subject)
});

module.exports = mongoose.model('Subject', subjectSchema);
