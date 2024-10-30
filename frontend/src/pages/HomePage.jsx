import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ isLoggedIn, role }) => {
  console.log(role);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="text-center px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Certificate Verification System</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Our Certificate Verification System simplifies the process of verifying internship certificates.
          Students can easily search for and download their certificates, while administrators can manage
          and issue certificates with ease.
        </p>
        <div className="mt-8">
          {/* Conditionally display buttons based on user role */}
          
          {isLoggedIn && role === 'Admin' ? (
            <Link
              to="/admin-dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Upload Students' Details
            </Link>
          ) : (
            <Link
              to={isLoggedIn ? "/search" : "/login"}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            >
              Search for Certificates
            </Link>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>&copy; 2024 Certificate Verification System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;