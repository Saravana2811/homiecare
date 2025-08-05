import { useNavigate } from 'react-router-dom';
import cleaning from '../assets/cleaning.jpg';
import electrical from '../assets/eleectrical.jpg'; 
import image from '../assets/image.jpg';
import paint from '../assets/paint.jpg';
import plumb from '../assets/plumb.jpg';
import smart from '../assets/smart.png';
import instant from '../assets/pest.jpg';
import child from '../assets/child.jpeg';

const cardsData = [
  { id: 1, title: 'Plumbing', description: 'Expert plumbing', image: plumb, route: '/plumbing' },
  { id: 2, title: 'Electrical', description: 'Certified electricians', image: electrical, route: '/electrician' },
  { id: 3, title: 'Cleaning', description: 'Deep cleaning', image: cleaning, route: '/cleaning' },
  { id: 4, title: 'AC Maintenance', description: 'Complete AC services', image: image, route: '/ac' },
  { id: 5, title: 'Smart Home', description: 'Home automation setups', image: smart, route: '/bathroom' },
  { id: 6, title: 'Child Proofing', description: 'Safe Home for your child', image: child, route: '/child-proofing' },
  { id: 7, title: 'Pest Control', description: 'Interior/exterior painting', image: instant, route: '/pest-control' },
];

const Most = () => {
  const navigate = useNavigate();

  return (
    <div className="most-wrapper">
      <div className="scroll-container">
        {cardsData.map(card => (
          <div className="card1" key={card.id}>
            <img src={card.image} alt={card.title} />
            <h3 className="head3">{card.title}</h3>
            <p>{card.description}</p>
            <button onClick={() => navigate(card.route)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Most;