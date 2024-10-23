import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const StarRating = ({ rating, size, colour }) => {
  const totalStars = 5;

  let colourArray: string[];
  if (colour.length === 1) {
    for (let c = 0; c < totalStars; c++) {
      colourArray.push(colour[0]);
    }
  }

  if ((colourArray.length === 0) && (colour.length < totalStars)) {
    colourArray.push(colour);
    for (let c = colour.length; c < totalStars; c++) {
      colourArray.push(colour[0]);
    }
  } else {
    colourArray.push(colour);
  }

  return (
    <div className="star-rating d-flex">
      {[...Array(totalStars)].map((_, index) => {
        const starRatingValue = index + 1;
        return (
          <FaStar
            key={index}
            className="star"
            size={size}
            color={starRatingValue <= rating ? colour : '#e4e5e9'} // Gold if filled, gray if empty  '#ffc107'
          />
        );
      })}
      <span className="ms-2">{rating.toFixed(2)} / 5.0</span>
    </div>
  );
};

export default StarRating;
