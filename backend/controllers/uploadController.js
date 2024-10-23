// backend/controllers/uploadController.js
import Student from '../models/Student.js';

// Controller function to handle file upload and save student data
export const uploadStudentData = async (req, res) => {
  try {
    const { studentData } = req.body;

    if (!studentData || studentData.length === 0) {
      return res.status(400).json({ message: 'No data provided' });
    }

    // Validate and save each student record to MongoDB
    for (const student of studentData) {
      const { certificateID, studentName, internshipDomain, startDate, endDate } = student;

      // Check for missing required fields
      if (!certificateID || !studentName || !internshipDomain || !startDate || !endDate) {
        return res.status(400).json({ message: 'Missing required fields in student data' });
      }

      // Create a new student record in MongoDB
      const newStudent = new Student({
        certificateID,
        studentName,
        internshipDomain,
        startDate,
        endDate,
      });

      await newStudent.save();
    }

    res.status(200).json({ message: 'Student data uploaded successfully' });
  } catch (err) {
    console.error('Error uploading student data:', err);
    res.status(500).json({ message: 'Server error while saving student data' });
  }
};
