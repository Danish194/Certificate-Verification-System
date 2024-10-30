import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/certificates/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload Certificates</button>
    </div>
  );
};

export default AdminDashboard;