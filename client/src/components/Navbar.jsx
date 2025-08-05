import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://masterbundles.com/wp-content/uploads/2023/03/home1y-01-238-1024x1024.jpg" alt="Logo" />
        <span>HomieCare</span>
      </div>

      <div className="navbar-right">
        <button className="login-btn"><a href="/after" style={{ textDecoration: 'none', color: 'inherit' }}>Register To Serve</a></button>
        <button className="login-btn"><a href="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Service Booking</a></button>
      </div>
    </nav>
  );
};

export default Navbar;