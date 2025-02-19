import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';
import ManageProjects from './pages/projectManage';
import ManageSites from './pages/siteManage';
import ServiceManager from './pages/serviceManage';
import ManageUsers from './pages/userManage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<Home />} />
        <Route path="ManageProjects" element={<ManageProjects />} />
        <Route path="ManageSites" element={<ManageSites />} />
        <Route path="ManageService" element={<ServiceManager />} />
        <Route path="ManageUsers" element={<ManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;