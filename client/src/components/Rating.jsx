import './Rating.css';
import p2 from '../assets/prof.jpg'
import p3 from '../assets/rating.jpg'
const Rating = () => {
  return (
    <div className='rate'>
      <div className="rate-group">
        <img src={p2} />
        <h1 className='r1'>More Trusted Users</h1>
      </div>
      <div className="rate-group">
        <img src={p3} />
        <h1 className='r1'>4.5<br/>Average Rating For all Services </h1>
      </div>
    </div>
  )
}

export default Rating;