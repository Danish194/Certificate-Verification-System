import React, { useState } from 'react';
import axios from 'axios';
import CertificateDetails from './CertificateDetails';

const SearchForm = () => {
  const [certificateId, setCertificateId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!certificateId) {
      setError('Please enter a valid Certificate ID');
      return;
    }
    setError('');
    setLoading(true);
  
    try {
      const response = await axios.get(`/api/certificates/${certificateId}`);
      if (response.data) {
        setCertificateData(response.data); // Show the certificate details
        setError('');
      } else {
        setError('No certificate found for this Certificate ID');
        setCertificateData(null); // Clear any previous data
      }
    } catch (err) {
      console.error('Error fetching certificate:', err);
      setError('An error occurred while searching. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSearch} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Search Certificate</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="certificateId">
            Certificate ID
          </label>
          <input
            type="text"
            id="certificateId"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Display certificate details if found */}
      {certificateData && (
        <div className="mt-6">
          <CertificateDetails certificate={certificateData} />
        </div>
      )}
    </div>
  );
};

export default SearchForm;
