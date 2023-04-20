import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const StarRating = ({ stars, totalVotes = 0 }) => {
  const starElements = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(stars)) {
      starElements.push(<BsStarFill key={i} className="text-yellow-400" />);
    } else if (i - 0.5 === stars) {
      starElements.push(<BsStarHalf key={i} className="text-yellow-400" />);
    } else {
      starElements.push(<BsStar key={i} className="text-yellow-400" />);
    }
  }

  return (
    <div className="flex items-center">
      {starElements}
      <span className="ml-2 font-semibold">
        {stars.toFixed(1)} ({totalVotes} votes)
      </span>
    </div>
  );
};

export default StarRating;
