import { useState } from 'react';
import c3 from '../assets/wash.jpg';
import c2 from '../assets/fridge1.jpg'; 
import c4 from '../assets/ac.png';
import c6 from '../assets/heat.jpg';
import c1 from '../assets/tv.jpg';
import c5 from '../assets/ac1.jpg';
import c7 from '../assets/view.jpg';
import './Smart.css';

const cardsData = [
  { id: 1,
     title: 'Television',
     description: 'Bringing your screen back to life with precise TV repair solutions.',
     image: c1 
  },
  { id: 2,
    title: 'Refridgerator',
    description: 'Keeping your cool—expert refrigerator fixes that restore freshness.',
    image: c2
  },
  { id: 3,
    title: 'Washing Machine',
    description: 'Spin your laundry worries away with our reliable washer repair service.',
    image: c3
  },
  { id: 4,
    title: 'AC Maintenance',
    description: 'Breathe easy again with fast, efficient air conditioner care.',
    image: c4
  },
  { id: 5,
    title: 'Water Purifier',
    description: 'Pure water, pure service—restoring your purifier’s performance.',
    image: c5
  },
  { id: 6,
    title: 'Heater', description: 'Restoring hot water comfort with quick and reliable repairs.',
    image: c6
  },
  { id: 7,
    title: 'Others',
    description: 'View more smart appliances repairs with some offers.',
    image: c7
  },
];

const Smart = () => {
  const [showModal, setShowModal] = useState(false);

  const handleViewClick = (title) => {
    if (title === 'Others') {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="most-wrapper">
      <div className="scroll-container">
        {cardsData.map((card) => (
          <div className="card2" key={card.id}>
            <img src={card.image} alt={card.title} />
            <h3 className="head3">{card.title}</h3>
            <p>{card.description}</p>
            <button onClick={() => handleViewClick(card.title)}>View</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Other Appliance Repair</h2>

            <h3>Home Appliances</h3>
            <div className="button-group">
              <button>Oven</button>
              <button>Dish Washer</button>
              <button>Smart Fans</button>
              <button>Thermostat</button>
              <button>Door Bell</button>
            </div>

            <h3>Kitchen Appliances</h3>
            <div className="button-group">
              <button>Water Purifier</button>
              <button>Refrigerator</button>
              <button>Stove</button>
              <button>Microwave</button>
              <button>Chimney</button>
            </div>

            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Smart;
