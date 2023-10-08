// models/studentModel.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
        name: String,
        grade: Number,
    }
  ]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
