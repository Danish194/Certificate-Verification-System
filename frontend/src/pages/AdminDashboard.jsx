// src/pages/AdminDashboard.jsx
import React from 'react';
import FileUpload from '../components/FileUpload';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <FileUpload />
      {/* Add more admin functionalities here */}
    </div>
  );
};

export default AdminDashboard;