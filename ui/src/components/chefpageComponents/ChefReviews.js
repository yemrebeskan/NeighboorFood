import React from 'react';
import Review from './Review';

// This data should come from backend:
const dummyReviews = [
    {
      id: 1,
      reviewer: {
        firstName: 'Alex',
        lastName: 'Durray',
        profileImage: 'https://via.placeholder.com/150',
      },
      date: 'April 18, 2023',
      rating: 4,
      comment: 'The food was delicious and the service was excellent!',
      menuItem: 'Grilled Salmon',
    },
    {
      id: 2,
      reviewer: {
        firstName: 'Emma',
        lastName: 'Smith',
        profileImage: 'https://via.placeholder.com/150',
      },
      date: 'April 10, 2023',
      rating: 5,
      comment: 'Amazing experience! The chef is very talented.',
      menuItem: 'Lamb Chops',
    },
  ];

  const ChefReviews = () => {
    return (
      <div className = "flex flex-col grow">
        {dummyReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    );
  };
  
  export default ChefReviews;
