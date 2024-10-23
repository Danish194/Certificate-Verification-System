import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import axios from 'axios';

const SearchCertificatePage = () => {
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (certificateId) => {
    try {
      // Make an API request to fetch certificate details based on the certificate ID
      const response = await axios.get(`/api/certificates/${certificateId}`);
      setCertificate(response.data);
      setError('');
    } catch (err) {
      setError('Certificate not found or an error occurred');
      setCertificate(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <SearchForm onSearch={handleSearch} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {certificate && (
        <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Certificate Details</h2>
          <p><strong>Certificate ID:</strong> {certificate.certificateId}</p>
          <p><strong>Student Name:</strong> {certificate.studentName}</p>
          <p><strong>Internship Domain:</strong> {certificate.domain}</p>
          <p><strong>Start Date:</strong> {new Date(certificate.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(certificate.endDate).toLocaleDateString()}</p>
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            onClick={() => window.print()}
          >
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchCertificatePage;