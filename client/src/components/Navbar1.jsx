import React, { useState } from "react";
import "./Navbar1.css";

function Navbar1() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="nav">
        <div className="left-section">
          <img
            src="https://masterbundles.com/wp-content/uploads/2023/03/home1y-01-238-1024x1024.jpg"
            alt="logo"
            className="logo"
          />
          <span className="brand">HomieCare</span>
        </div>

        <div className="right-section">
          <input type="text" placeholder="Search..." className="search-bar" />
          <div
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className={`side-menu ${isOpen ? "show" : ""}`}>
        <ul>
          <li><a href="#">Home</a></li><hr />
          <li><a href="#">Services</a></li><hr />
          <li><a href="#">Contact</a></li><hr />
          <li><a href="#">Profile</a></li><hr />
         <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <li><a href="#">Logout</a></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar1;
