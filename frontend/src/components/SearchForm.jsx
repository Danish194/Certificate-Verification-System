import React, { useState } from 'react';
import { db } from '../auth/firebase'; // Import Firestore
import { collection, query, where, getDocs } from 'firebase/firestore';
import CertificateDetails from './CertificateDetails'; // New component for displaying certificate

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
      const studentDataCollection = collection(db, 'students');
      const q = query(studentDataCollection, where('certificateID', '==', parseInt(certificateId))); // If certificateID is a number


  
      // Execute the query
      const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        setError('No certificate found for this Certificate ID');
        setCertificateData(null); // Clear any previous data
      } else {
        // Get the first matched document (assuming certificate IDs are unique)
        const result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
        setCertificateData(result); // Pass the result to the state to display
        setError('');
      }
    } catch (err) {
      console.error('Error fetching certificate:', err);
      setError('An error occurred while searching. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Search for Certificate</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label htmlFor="certificateId" className="block text-gray-700 font-bold mb-2">
            Certificate ID
          </label>
          <input
            type="text"
            id="certificateId"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your Certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {/* Render Certificate Details after a successful search */}
      {certificateData && <CertificateDetails certificate={certificateData} />}
    </div>
  );
};

export default SearchForm;