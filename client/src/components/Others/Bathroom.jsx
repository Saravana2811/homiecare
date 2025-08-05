import React, { useEffect } from 'react'

const Bathroom = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>Bath</h1>
    </div>
  )
}

export default Bathroom
