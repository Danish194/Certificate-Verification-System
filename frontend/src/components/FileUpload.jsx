// src/components/FileUpload.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

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

      // Validate and process data before sending it to the backend
      const formattedData = data.slice(1).map((row) => ({
        certificateID: row[0],
        studentName: row[1],
        internshipDomain: row[2],
        startDate: row[3],
        endDate: row[4],
      }));

      // Send data to the backend for MongoDB storage
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentData: formattedData }),
        });

        if (response.ok) {
          setMessage('File uploaded and data saved successfully!');
          setError('');
          setFile(null); // Reset file input
        } else {
          setError('Error uploading data to the server');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error connecting to the server');
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
