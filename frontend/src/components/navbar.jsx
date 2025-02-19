import React, { useState, useEffect } from "react";
import "../styles/navbar.css";

const Navbar = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false); // State لإدارة القائمة الجانبية
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-logo navbar-brand">
          <a href="/">{title}</a>
        </div>
        <div id="navbarNav" className={`navbar-links ${isOpen ? "active" : ""}`}>
          <ul>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={toggleNavbar}>
                <i className="fa-solid fa-house"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about" onClick={toggleNavbar}>
                <i className="fa-solid fa-address-card"></i> About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services" onClick={toggleNavbar}>
                <i className="fa-solid fa-bell-concierge"></i> Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact" onClick={toggleNavbar}>
                <i className="fa-solid fa-address-book"></i> Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login" onClick={toggleNavbar}>
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </a>
            </li>
          </ul>
        </div>
                
        {/* زر تفعيل الوضع الداكن */}
        <button className="toggle-dark-mode" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
        <div className="navbar-toggle" onClick={toggleNavbar}>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
