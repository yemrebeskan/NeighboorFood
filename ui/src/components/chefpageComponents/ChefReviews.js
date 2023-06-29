import React, { useState } from 'react'
import Review from './Review'
import axios from 'axios'

// This data should come from backend:

const ChefReviews = ({ isChef, reviews }) => {
  const [allReviews, setAllReviews] = useState(reviews ? reviews : undefined)

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
      {typeof allReviews === 'undefined' ? (
        <div className="mt-5 px-4 text-xl py-2">
          No review was found.
        </div>
      ) : (
        allReviews.map((review) => (
          <Review
            changeReviewReply={changeReviewReply}
            key={review.id}
            review={review}
            isChef={isChef}
          />
        ))
      )}
    </div>
  )
}

export default ChefReviews
