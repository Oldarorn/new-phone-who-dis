import React from "react";
import ReactStars from "react-stars";

export const DriverStars = (driver) => {
  return (
    <div>
      <ReactStars edit={false} count={5} value={driver.stars} />
    </div>
  );
};
