import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm/UserForm';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route exact path="/" element={<UserForm />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
