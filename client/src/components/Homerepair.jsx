import React, { useState } from 'react';
import c3 from '../assets/tap.jpg';
import c2 from '../assets/fan.jpg'; 
import c4 from '../assets/pipe.png';
import c6 from '../assets/switch.jpg';
import c1 from '../assets/cup.jpg';
import c5 from '../assets/flush.jpg';
import c7 from '../assets/view.jpg';
import './Homerepair.css';

const cardsData = [
  { id: 1, title: 'Hings Installation', description: 'Fixing small cracks, chips, or edge damage in wooden cupboard panels or doors.', image: c1 },
  { id: 2, title: 'Fan Repair', description: 'Repair of loose fittings, noise issues or wall-mounted fans', image: c2 },
  { id: 3, title: 'Taps Repair', description: 'Fixing minor leaks, or low water flow issues in kitchen or bathroom taps', image: c3 },
  { id: 4, title: 'Pipeline Issue', description: 'Repair of small leaks, loose joints, or blockages in water pipelines.', image: c4 },
  { id: 5, title: 'Flush Tank Repair', description: 'Fixing leakage, or button/handle issues in toilet flush systems.', image: c5 },
  { id: 6, title: 'Switch Replacement', description: 'Repair or replacement of faulty, loose, or non-working on/off switches.', image: c6 },
  { id: 7, title: 'Others', description: 'View Other services and repairs offered by HomeServices', image: c7 },
];

const Homerepair = () => {
  const [showModal, setShowModal] = useState(false);

  const handleViewClick = (card) => {
    if (card.title === "Others") {
      setShowModal(true);
    }
  };

  return (
    <div className="most-wrapper">
      <h1 className='home1'>From Drips to Breaks — We Mend It All!!</h1>
      <div className="scroll-container">
        {cardsData.map(card => (
          <div className="card3" key={card.id}>
            <img src={card.image} alt={card.title} />
            <h3 className="head3">{card.title}</h3>
            <p>{card.description}</p>
            <button onClick={() => handleViewClick(card)}>View</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>{/* stopPropagation-events “bubble” up the DOM tree.*/}
            <h2>More Services</h2>
            <ul className="modal-list">
              <button>Sink Drainage Removal</button>
              <button>Minor Door Breakage</button>
              <button>Switch Board Replacement</button>
              <button>Waste Pipe Replacement</button>
              <button>AC outlet</button>
            </ul>
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homerepair;
