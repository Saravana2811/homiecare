import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>HomieCare</h3>
          <p>Your trusted local home services experts providing quality service.</p>
          <div className="contact-info">
            <span></span>
          </div>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul className="footer-links">
            <li>Emergency Repairs</li>
            <li>Drain Cleaning</li>
            <li>Water Heaters</li>
            <li>Pipe Repair</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Areas Served</h4>
          <ul className="footer-links">
            <li>Downtown Area</li>
            <li>Suburbs</li>
            <li>Industrial District</li>
            <li>Surrounding Counties</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Business Hours</h4>
          <ul className="footer-links">
            <li>Mon-Fri: 7AM - 8PM</li>
            <li>Saturday: 8AM - 6PM</li>
            <li>Sunday: 9AM - 5PM</li>
            <li className="emergency">24/7 Emergency Service</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 HomieCare. All rights reserved. Licensed & Insured.</p>
        <p className="design">Designed and Maintained By Saravana M || Shanmuga Patel Kani C</p>
      </div>
    </footer>
  );
};

export default Footer;