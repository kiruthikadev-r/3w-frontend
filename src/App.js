import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import UserForm from './components/UserForm/UserForm';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Login from './components/Login/Login';

function App() {
  return (
    <Router> {/* Wrap Routes in BrowserRouter */}
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
