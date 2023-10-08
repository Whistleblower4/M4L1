const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const port = 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://vaibhavsolankivs:vaibhavsolankivs@myfirstmangocluster-gvp.rrt052s.mongodb.net/M4L1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose schema and model for students
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  courses: [
    {
      name: String,
      grade: Number,
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

// Create a new student with course information
const newStudent = new Student({
  name: 'John Doe',
  age: 25,
  email: 'john.doe@example.com',
  courses: [
    { name: 'Math', grade: 95 },
    { name: 'Science', grade: 88 },
  ],
});

// Save the student to the database using promises
newStudent.save()
  .then((student) => {
    console.log('Student saved:', student);
  })
  .catch((err) => {
    console.error('Error saving student:', err);
  });

// Query the database to retrieve all students
Student.find()
  .then((students) => {
    console.log('Students with course information:', students);
  })
  .catch((err) => {
    console.error('Error retrieving students:', err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
