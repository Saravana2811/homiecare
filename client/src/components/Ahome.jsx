import React from "react";
import "./Ahome.css";
import { useNavigate } from 'react-router-dom';

const Ahome = ({ icon, tag, title, description, rating, route }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="tag">{tag}</div>
      <img src={icon} alt={title} className="icon" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="book-btn" onClick={() => navigate(route)}>Book Now →</button>
      <div className="rating">
        <span className="stars">★</span>
        <span className="value">{rating}</span>
      </div>
    </div>
  );
};

export default Ahome;
