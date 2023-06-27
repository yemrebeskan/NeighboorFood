import React, { useState } from 'react'
import Review from './Review'
import axios from 'axios'

// This data should come from backend:
const dummyReviews = [
  {
    id: 1,
    reviewer: {
      name: 'Alex',
      surname: 'Durray',
      image: 'https://via.placeholder.com/150',
    },
    date: 'April 18, 2023',
    rating: 4,
    comment: 'The food was delicious and the service was excellent!',
    menuItem: 'Grilled Salmon',
    reply:
      'Thank you for your kind words, Alex! Looking forward to serving you again.',
  },
  {
    id: 2,
    reviewer: {
      name: 'Emma',
      surname: 'Smith',
      image: 'https://via.placeholder.com/150',
    },
    date: 'April 10, 2023',
    rating: 5,
    comment: 'Amazing experience! The chef is very talented.',
    menuItem: 'Lamb Chops',
    reply: '',
  },
]

const ChefReviews = ({ isChef, reviews }) => {
  const [allReviews, setAllReviews] = useState(reviews ? reviews : dummyReviews)

  const changeReviewReply = async (review, incomingReply) => {
    const index = allReviews.findIndex((r) => r.id === review.id)
    if (index !== -1) {
      console.log(review)
      let updatedReview = allReviews.at(index)
      updatedReview.reply = incomingReply
      // There is no endpoint for making reviews rn.
      // const res = await axios.put(
      //   'http://127.0.0.1:3001/api/v1/users/login',
      //   updatedReview
      // )
      setAllReviews([
        ...allReviews.slice(0, index),
        updatedReview,
        ...allReviews.slice(index + 1),
      ])
    }
  }

  return (
    <div className="flex flex-col grow">
      {allReviews.map((review) => (
        <Review
          changeReviewReply={changeReviewReply}
          key={review.id}
          review={review}
          isChef={isChef}
        />
      ))}
    </div>
  )
}

export default ChefReviews
