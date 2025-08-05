import React, { useState, useEffect, useRef } from 'react';
import './Common.css';
import Navbar3 from '../Navbar3';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const Smarthome = () => {
  const navigate = useNavigate();
  const servicesRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const services = [
    {
      icon: '❄️',
      title: 'AC Installation',
      description: 'Professional installation of all AC types including split, window, and central systems.',
      price: 'Rs.1500+'
    },
    {
      icon: '🔧',
      title: 'AC Repair',
      description: 'Expert repair services for all AC issues including cooling problems and electrical faults.',
      price: 'Rs.800+'
    },
    {
      icon: '🧼',
      title: 'AC Maintenance',
      description: 'Regular maintenance to keep your AC running efficiently and extend its lifespan.',
      price: 'Rs.600+'
    },
    {
      icon: '🧪',
      title: 'Gas Refilling',
      description: 'Complete gas refilling service with leak testing and performance check.',
      price: 'Rs.1000+'
    },
    {
      icon: '🧹',
      title: 'Deep Cleaning',
      description: 'Thorough cleaning of AC units including coils, filters, and drainage systems.',
      price: 'Rs.700+'
    },
    {
      icon: '🏡',
      title: 'Duct Cleaning',
      description: 'Professional duct cleaning service for central AC systems to improve air quality.',
      price: 'Rs.2000+'
    },
    {
      icon: '⚡',
      title: 'Emergency Service',
      description: '24/7 emergency AC repair services for urgent cooling system failures.',
      price: 'Rs.1200+'
    },
    {
      icon: '🔄',
      title: 'AC Replacement',
      description: 'Complete replacement of old AC units with new energy-efficient models.',
      price: 'Rs.15000+'
    }
  ];

  const handleBookNow = (service) => {
    // Navigate to payment page with service data
    navigate('/pay', { 
      state: { 
        service: service,
        amount: service.price,
        serviceName: service.title,
        servicerName: 'Professional AC Service Provider'
      } 
    });
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedService(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({
      ...bookingForm,
      [name]: value
    });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', {
      service: selectedService,
      customer: bookingForm
    });
    // Reset form and close modal
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      message: ''
    });
    setShowBookingModal(false);
    setSelectedService(null);
    // Show success message (you could add a toast notification here)
    alert('Thank you for your booking! We will contact you shortly to confirm.');
  };

  return (
    <div className="ac-full-page">

      <Navbar3 />
      <div className="ac-hero">
        <div className="ac-hero-content">
          <h1>Premium AC Services</h1>
          <p className='ac-hero-p'>We Provide Premium Services At Affordable Cost!!</p>
          <button className="ac-cta-button" onClick={scrollToServices}>View Our Services</button>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="ac-services-full" ref={servicesRef}>
        <h2>Our AC Services</h2>
        <div className="ac-services-horizontal">
          {services.map((service, index) => (
            <div key={index} className="ac-service-card-full">
              <div className="ac-service-icon-full">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="ac-service-price-full">{service.price}</div>
              <button onClick={() => handleBookNow(service)}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
      
     
      <div className="ac-why-us">
        <h2>Why Choose Our AC Services?</h2>
        <div className="ac-benefits-grid">
          <div className="ac-benefit-card">
            <div className="ac-benefit-icon">🏆</div>
            <h3>Certified Experts</h3>
            <p>Our technicians are factory-trained and certified with 10+ years experience</p>
          </div>
          <div className="ac-benefit-card">
            <div className="ac-benefit-icon">⏱️</div>
            <h3>Fast Response</h3>
            <p>Same-day service available with 24/7 emergency support</p>
          </div>
          <div className="ac-benefit-card">
            <div className="ac-benefit-icon">💰</div>
            <h3>Fair Pricing</h3>
            <p>No hidden fees with upfront pricing and satisfaction guarantee</p>
          </div>
          <div className="ac-benefit-card">
            <div className="ac-benefit-icon">🛠️</div>
            <h3>Quality Parts</h3>
            <p>We use only OEM or high-quality aftermarket components</p>
          </div>
        </div>
      </div>

      <div className="ac-why-us1">
        <h2 className='ac-why-us1-h2'>What Your Customer Say?</h2>
        <div className="ac-benefits-grid">
          <div className="ac-benefit-card">
            <div className="ac-benefit-icon">👤</div>
            <h3>Patel</h3>
            <p>Our technicians are factory-trained and certified with 10+ years experience</p>
          </div>
          <div className="ac-benefit-card">
            <div className="ac-benefit-icon">👥</div>
            <h3>Sudharsan</h3>
            <p>Same-day service available with 24/7 emergency support</p>
          </div>
          <div className="ac-benefit-card">
            <div className="ac-benefit-icon">👥</div>
            <h3>Prabhu</h3>
            <p>No hidden fees with upfront pricing and satisfaction guarantee</p>
          </div>
          <div className="ac-benefit-card">
            <div className="ac-benefit-icon">👤</div>
            <h3>Maithiri</h3>
            <p>We use only OEM or high-quality aftermarket components</p>
          </div>
        </div>
      </div>
      
      
      
      <Footer />
    </div>
  );
};

export default Smarthome;