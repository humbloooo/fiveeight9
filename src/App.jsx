import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import SkeletonLoader from './components/SkeletonLoader';

const MainSite = lazy(() => import('./MainSite'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Cafeteria = lazy(() => import('./pages/Cafeteria'));
const Safety = lazy(() => import('./pages/Safety'));
const TenantForum = lazy(() => import('./pages/TenantForum'));
const RentCalculator = lazy(() => import('./pages/RentCalculator'));
const WellnessCenter = lazy(() => import('./pages/WellnessCenter'));
const EventsCalendar = lazy(() => import('./pages/EventsCalendar'));
const MaintenanceTicket = lazy(() => import('./pages/MaintenanceTicket'));

const PageFallback = () => (
    <div style={{ padding: '100px 5%', background: 'var(--navy)', minHeight: '100vh' }}>
        <SkeletonLoader height="400px" borderRadius="24px" />
    </div>
);

const AnimatedRoutes = ({ token, setToken }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
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
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  return (
    <Router>
      <ToastProvider>
        <AnimatedRoutes token={token} setToken={setToken} />
      </ToastProvider>
    </Router>
  );
}

export default App;
