import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar1 from './Navbar1';
import './After.css';
import Ahome from './Ahome';
import Most from './Most';
import Banner from './Banner';
import './Most.css';
import Rating from './Rating';
import Smart from './Smart';
import Homerepair from './Homerepair';
import Footer from './Footer';
import Plumbing from './Others/Plumbing.jsx';
import Electrician from './Others/Electrician.jsx';
import Cleaning from './Others/Cleaning.jsx';
import AC from './Others/AC.jsx';

import Smarthome from './Others/Smarthome.jsx';
import Pay from './payements/pay.jsx';
const services = [
  {
    icon: "https://img.icons8.com/ios-filled/100/000000/plumbing.png",
    tag: "HOME SERVICES",
    title: "Plumbing",
    description: "Expert plumbing solutions for repairs, and installations with 24/7 availability.",
    rating: "4.9",
    route: "/plumbing"
  },
  {
    icon: "https://img.icons8.com/ios-filled/100/000000/light-on.png",
    tag: "HOME SERVICES",
    title: "Electrical",
    description: "Certified electricians for all wiring, panel upgrades, and lighting installations.",
    rating: "4.8",
    route: "/electrician"
  },
  {
    icon: "https://img.icons8.com/ios-filled/100/000000/broom.png",
    tag: "CLEANING",
    title: "Deep Cleaning",
    description: "Professional deep cleaning for homes and offices with eco-friendly products.",
    rating: "4.7",
    route: "/cleaning"
  },
  {
    icon: "https://img.icons8.com/ios-filled/100/000000/air-conditioner.png",
    tag: "HVAC",
    title: "AC Maintenance",
    description: "Complete AC cleaning and maintenance to improve efficiency and air quality.",
    rating: "4.9",
    route: "/ac"
  },
  {
    icon: "https://static.vecteezy.com/system/resources/previews/000/366/438/original/home-vector-icon.jpg",
    tag: "TECHNOLOGY",
    title: "Smart Home Setup",
    description: "Certified electricians for all wiring, panel upgrades, and lighting installations.",
    rating: "4.8",
    route: "/smarthome"
  },
];


function HomePage() {
  return (
    <>
      <Navbar1 />
      <br/><br/><br/>
      <div className='wb'>
        <h1>Welcome Back!</h1>
        <p className='bk'>Book professional services with just one click</p>
      </div>
      <Banner />
      <div className="container">
        {services.map((service, index) => (
          <div key={index}>
            <Ahome {...service} />
            
          </div>
        ))}
      </div>
      <div className='most1'>
        <h1>Top Requested Services</h1>
        <Most />
      </div>
      <Rating />
      <div className='sol1'>
        <h1>Smart Appliances Repair</h1>
        <Smart />
      </div>
      <Homerepair />
      <Footer />
    </>
  );
}

const After = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/plumbing" element={<Plumbing />} />
      <Route path="/electrician" element={<Electrician />} />
      <Route path="/cleaning" element={<Cleaning />} />
      <Route path="/ac" element={<AC />} />
      <Route path="/smarthome" element={<Smarthome />} />
      <Route path="/pay" element={<Pay />} />
    </Routes>
  );
};

export default After;