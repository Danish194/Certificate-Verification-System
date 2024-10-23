import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/Admindashboard';
import SearchCertificate from './pages/SearchCertificatePage';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'Admin' or 'Student'

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };
  return (
    <BrowserRouter>
      {/* Include the Header and pass props */}
      <Header isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin-dashboard" element={isLoggedIn && userRole === 'Admin' ? <AdminDashboard /> : <HomePage />} />
        <Route path="/search" element={isLoggedIn && userRole === 'Student' ? <SearchCertificate /> : <HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;