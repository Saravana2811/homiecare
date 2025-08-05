import React, { useEffect } from 'react'

const Electrician = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>electrical</h1>
    </div>
  )
}

export default Electrician
