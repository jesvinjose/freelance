const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  designation: {
    type: String,
    required: true,
    ref: 'Job', // References the `designation` field from the `Jobs` collection
    trim: true // Removes leading and trailing whitespace
  },
  name: {
    type: String,
    required: true,
    trim: true // Removes leading and trailing whitespace
  },
  email: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespace
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Validates email format
  },
  mobile: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespace
    match: [/^\d{10}$/, 'Please fill a valid mobile number'] // Validates mobile number format
  },
  resumeFile: {
    type: String,
    required: true // Path to the resume file
  }
}, {
  timestamps: true // Automatically creates `createdAt` and `updatedAt` fields
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
