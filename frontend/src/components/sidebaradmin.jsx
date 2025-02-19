import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Sidebaradmin() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const verifyAdmin = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const decoded = jwtDecode(token);
        if(decoded.role !== "admin"){
          navigate("/");
        }
      };
      verifyAdmin();
    }, [navigate]);
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };
  
  
  
    return (
        <nav className="admin-sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li><Link to="/ManageSites">Manage content</Link></li>
            <li><Link to="/ManageProjects">Manage Projects</Link></li>
            <li><Link to="/ManageService">Manage Services</Link></li>
            <li><Link to="/ManageUsers">Manage Users</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
    );
  };
  
export default Sidebaradmin
