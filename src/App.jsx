import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainSite from './MainSite';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Cafeteria from './pages/Cafeteria';
import Safety from './pages/Safety';
import TenantForum from './pages/TenantForum';
import RentCalculator from './pages/RentCalculator';
import WellnessCenter from './pages/WellnessCenter';
import EventsCalendar from './pages/EventsCalendar';
import MaintenanceTicket from './pages/MaintenanceTicket';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/cafeteria" element={<Cafeteria />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/forum" element={<TenantForum />} />
        <Route path="/calculator" element={<RentCalculator />} />
        <Route path="/wellness" element={<WellnessCenter />} />
        <Route path="/events" element={<EventsCalendar />} />
        <Route path="/maintenance" element={<MaintenanceTicket />} />
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
