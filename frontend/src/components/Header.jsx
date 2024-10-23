import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, userRole, handleLogout }) => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Site Name */}
        <div className="text-2xl font-bold">
          <Link to="/">Certificate Verification</Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>

          {/* Show Login button if the user is not logged in */}
          {!isLoggedIn && (
            <Link to="/login" className="hover:underline">Login</Link>
          )}

          {/* Show different links based on the user role if the user is logged in */}
          {isLoggedIn && (
            <>
              {userRole === 'Admin' && (
                <Link to="/admin-dashboard" className="hover:underline">Admin Dashboard</Link>
              )}
              {userRole === 'Student' && (
                <Link to="/search" className="hover:underline">Search Certificate</Link>
              )}
              {/* Logout button for logged-in users */}
              <button 
                onClick={handleLogout} 
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;