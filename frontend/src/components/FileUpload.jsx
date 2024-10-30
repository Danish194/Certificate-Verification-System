import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { db } from '../auth/firebase';
import { collection, addDoc } from 'firebase/firestore';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
      setMessage('File selected: ' + selectedFile.name);
      setError('');
    } else {
      setError('Please select a valid Excel file (.xlsx)');
      setFile(null);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON (array of objects)
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Log the parsed data for debugging
      console.log("Parsed Data: ", data);

      // Process and save data to Firestore
      try {
        const studentDataCollection = collection(db, 'students'); // Create a collection named 'students'
        
        // Loop through each row of data and save it
        for (let i = 1; i < data.length; i++) { // Start from 1 to skip the header row
          const [certificateID, studentName, internshipDomain, startDate, endDate] = data[i];

          // Validate that none of the fields are undefined or null
          if (!certificateID || !studentName || !internshipDomain || !startDate || !endDate) {
            console.error('Missing data in row:', data[i]);
            setError('One or more required fields are missing in the uploaded file.');
            return;
          }

          await addDoc(studentDataCollection, {
            certificateID,
            studentName,
            internshipDomain,
            startDate,
            endDate,
          });
        }

        setMessage('File uploaded and data saved successfully!');
        setError('');
        setFile(null); // Reset file input
      } catch (err) {
        console.error('Error uploading data to Firestore: ', err);
        setError('Error saving data to Firestore');
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4">Upload Excel File</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="mb-4 border border-gray-300 p-2 rounded w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
