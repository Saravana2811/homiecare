import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section id="services" className="section services">
      <h2>Our Services</h2>
      <div className="service-cards">
        <div className="card">
          <img src="https://th.bing.com/th/id/R.4de0be1150470420d6f4744c7f71a9d9?rik=U%2b9Zt8ZHaEWcBw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fplumbing-silhouette%2fplumbing-silhouette-6.png&ehk=qTFRGTL1hVQ9cQZdUd5LCulaWfndM8osJFpqIGdb%2fhA%3d&risl=&pid=ImgRaw&r=0" alt="Plumbing" />
          <h3>Plumbing</h3>
          <p>Leak repair, pipe fitting & bathroom maintenance.</p>
        </div>
        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/1063/1063376.png" alt="Electrical" />
          <h3>Electrical</h3>
          <p>Fan, switch, wiring and lighting installations.</p>
        </div>
        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046869.png" alt="Cleaning" />
          <h3>Cleaning</h3>
          <p>Home deep cleaning, kitchen, and sofa cleaning.</p>
        </div>
        <div className="card">
          <img src="https://th.bing.com/th/id/OIP.osfEzM761iFLIXrZomd62wHaHa?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3" alt="ACCleaning" />
          <h3>AC Cleaning</h3>
          <p>Dust cleaning, filter replacement, and Gas refilling.</p>
        </div>
        <div className="card">
          <img src="https://th.bing.com/th/id/OIP.klDyifKY7d4vT9GUv7zsLwHaHa?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3" alt="others" />
          <h3>Other Services</h3>
          <p>Various home maintenance and repair services.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;