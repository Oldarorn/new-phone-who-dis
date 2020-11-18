import React from 'react'
import ReactStars from 'react-stars';

export const DriverStars = (driver) => {
  return (
    <div>
      <ReactStars 
        count={5}
        value={driver.stars}
      />
    </div>
  )
}
