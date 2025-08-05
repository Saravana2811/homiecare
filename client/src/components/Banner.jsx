import React from 'react'
import './Banner.css'

const Banner = () => {
  return (
    <div className="netflix-banner">
      <div className="netflix-banner__contents">
        <h2 className="netflix-banner__title">Bathroom Cleaning</h2>
        <div className="netflix-banner__description">
          Enjoy a sparkling clean and germ-free bathroom with our professional bathroom cleaning service. Our trained staff uses eco-friendly and high-strength disinfectants to scrub, sanitize, and shine every corner of your bathroom
        </div>
        <div className="netflix-banner_buttons">
          <button className="netflix-banner_button">Explore Now</button>
        </div>
      </div>
    </div>
  )
}

export default Banner