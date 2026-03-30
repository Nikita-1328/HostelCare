import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import StudentManagement from './pages/StudentManagement';
import GatePass from './pages/GatePass';
import Complaints from './pages/Complaints';
import Announcements from './pages/Announcements';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/students" element={<StudentManagement />} />
                <Route path="/gatepass" element={<GatePass />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    );
}

export default App;
