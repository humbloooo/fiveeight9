import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainSite from './MainSite';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Cafeteria from './pages/Cafeteria';
import Safety from './pages/Safety';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/cafeteria" element={<Cafeteria />} />
        <Route path="/safety" element={<Safety />} />
        <Route
          path="/admin"
          element={!token ? <AdminLogin setToken={setToken} /> : <AdminDashboard token={token} setToken={setToken} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
