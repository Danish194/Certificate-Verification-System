import React, { useState } from 'react';
import { uploadExcelFile } from '../services/certificateService';

const AdminDashboard = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileUpload = async (e) => {
        e.preventDefault();
        try {
            if (file) {
                await uploadExcelFile(file);
                setMessage('File uploaded successfully');
            }
        } catch (error) {
            setMessage('File upload failed');
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleFileUpload}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit">Upload File</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminDashboard;
