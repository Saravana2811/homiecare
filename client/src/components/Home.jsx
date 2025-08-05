import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="section home">
      <div className="home-content-wrapper">
        <div className="home-text">
          <h1>Trusted Home Services at Your Doorstep</h1>
          <p>Book expert plumbing, electrical, and other cleaning services in just a few clicks.</p>
          <button className="book-btn" onClick={() => navigate('/signup')}>Book a Service</button>
        </div>
        <div className="home-video">
          <video autoPlay muted loop playsInline>
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Home;