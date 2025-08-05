import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import After from './components/After';
import Plumbing from './components/Others/Plumbing';
import Electrician from './components/Others/Electrician';
import Smarthome from './components/Others/Smarthome';
import Cleaning from './components/Others/Cleaning';
import AC from './components/Others/AC';
import Bathroom from './components/Others/Bathroom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Pay from './components/payements/pay';
function App() {
  return (
    <Router>
      <div className="main-content">
        <Routes>

          {/* Home page */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Services />
              <Contact />
              <Footer />
            </>
          } />

          {/* Other routes */}
          <Route path="/after/*" element={<After />} />
          <Route path="/plumbing" element={<Plumbing />} />
          <Route path="/electrician" element={<Electrician />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/ac" element={<AC />} />
          <Route path='/smarthome' element={<Smarthome />} />
          <Route path="/bathroom" element={<Bathroom />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Catch-all route for unknown paths */}
          <Route path="*" element={
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
              <a href="/" style={{ color: '#4CAF50', textDecoration: 'none' }}>
                Go back to Home
              </a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
