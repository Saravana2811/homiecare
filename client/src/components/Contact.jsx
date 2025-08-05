import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Contact.css";

function Contact() {
  const experts = [
    {
      name: "Rajesh Kumar",
      service: "Home Cleaning Service",
      rating: "4.5",
      experience: "2 years",
      location: "Madurai",
      image: "https://img.freepik.com/premium-vector/cleaner-illustration-color-cartoon-style-editable-vector_676904-5058.jpg?w=2000",
      route: "/signup" 
    },
    {
      name: "Kamala Kannan",
      service: "Home Repair",
      rating: "4.7",
      experience: "3 years",
      location: "Coimbatore",
      image: "https://img.freepik.com/premium-vector/mechanic-vector-white-background_889056-52340.jpg",
      route: "/signup"
    },
    {
      name: "Arun",
      service: "Painting",
      rating: "4.6",
      experience: "5 years",
      location: "Erode",
      image: "https://static.vecteezy.com/system/resources/previews/027/148/527/original/painter-man-painting-house-wall-with-roller-brush-worker-guy-using-paint-roller-and-paint-cans-decorator-job-interior-renovation-service-flat-character-illustration-vector.jpg",
      route: "/signup" 
    },
    {
      name: "Kunal Sharma",
      service: "Plumber Service",
      experience: "4 years",
      rating: "4.8",
      location: "Tiruppur",
      image: "https://static.vecteezy.com/system/resources/previews/023/157/517/non_2x/plumber-service-man-icon-cartoon-work-house-vector.jpg",
      route: "/signup" 
    },
    {
      name: "Prabhu Chennimalai",
      service: "Cleaning",
      experience: "4.5 years",
      rating: "4.6",
      location: "Kanniyakumari",
      image: "https://th.bing.com/th/id/R.22e8489103db80adaba19231669a97ec?rik=jCn5OHF4fB4P6A&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon-bw%2fhouse-cleaning-icons-7.png&ehk=xGNvmfvs9oz5TA5efV2t5SbViWv2f0U0npdQAoctMM4%3d&risl=&pid=ImgRaw&r=0",
      route: "/signup" 
    },
    {
      name: "Sudharsan V",
      service: "Painting",
      experience: "6 years",
      rating: "4.8",
      location: "Kodaikanal",
      image: "https://static.vecteezy.com/system/resources/previews/027/148/527/original/painter-man-painting-house-wall-with-roller-brush-worker-guy-using-paint-roller-and-paint-cans-decorator-job-interior-renovation-service-flat-character-illustration-vector.jpg",
      route: "/signup" 
    },
  ];

  return (
    <div className="contact" id="contact">
      <h2>Contact Us</h2>
      <p>Contact Our Experts For Suggestions At Any Time</p>
      <div className="expert-container">
        {experts.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt={item.name} className="expert-image" />
            <h3>{item.name}</h3>
            <p className="service">{item.service}</p>
            <p className="review">{item.experience}</p>
            <p className="location">{item.location || "Location not specified"}</p>
            {/* Replaced <a> with <Link> for client-side routing */}
            <Link to={item.route} className="see-more">
              Call Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;