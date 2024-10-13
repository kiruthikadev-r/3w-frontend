import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm/UserForm';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Login from './components/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/admin-login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
