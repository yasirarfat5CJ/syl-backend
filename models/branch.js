const mongoose = require('mongoose');

// Define the schema for the years and semesters
const semesterSchema = new mongoose.Schema({
  semesterNumber: { type: Number, required: true }, // 1 or 2
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]  // Reference to subjects
});

const yearSchema = new mongoose.Schema({
  yearNumber: { type: Number, required: true }, // 1st, 2nd, 3rd, or 4th year
  semesters: [semesterSchema]  // Array of semesters for this year
});

// Define the branch schema
const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  years: [yearSchema]  // Array of years (1st, 2nd, 3rd, 4th)
});

module.exports = mongoose.model('Branch', branchSchema);
