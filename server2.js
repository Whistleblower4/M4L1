const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://vaibhavsolankivs:vaibhavsolankivs@myfirstmangocluster-gvp.rrt052s.mongodb.net/M4L1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0, // Simple validation: age must be a positive number
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      name: String,
      grade: {
        type: Number,
        validate: {
          validator: (value) => value >= 0 && value <= 100, // Custom validation: grade must be between 0 and 100
          message: 'Grade must be between 0 and 100',
        },
      },
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

const invalidStudent = new Student({
  name: 'Invalid Student',
  age: -5, // Invalid: age is negative
  email: 'john.doe@example.com',
  courses: [
    { name: 'Math', grade: 105 }, // Invalid: grade is above 100
  ],
});

invalidStudent.save()
  .then((student) => {
    console.log('Student saved:', student);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      console.error('Validation Error:', err.message);
    } else {
      console.error('Error saving student:', err);
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
