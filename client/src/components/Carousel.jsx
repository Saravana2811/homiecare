import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import './Carousel.css';
import '../App.css';


const Carousel = ({ items = [ { image: ca1,  description: 'A gritty emotional action drama.' },
    { image: "https://static.vecteezy.com/system/resources/previews/027/148/527/original/painter-man-painting-house-wall-with-roller-brush-worker-guy-using-paint-roller-and-paint-cans-decorator-job-interior-renovation-service-flat-character-illustration-vector.jpg",  description: 'Epic Indian revolution saga.' },
    { image: ca3,  description: 'A powerful gangster action film.' },
    { image: ca4,  description: 'A story about illegal immigration dreams.' },
    { image: ca5,  description: 'A medical thriller unraveling organ racket.' },] }) => { // Provide a default empty array for items

  return (
    <div className="carousel-container">
      <ResponsiveCarousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        {items.map((item, index) => (
          <div className="carousel-item" key={index}>
            <img src={item.image} alt={item.title} />
            
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default Carousel;