import React from 'react';

function StarRating({ stars }) {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < stars ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

export default StarRating;
