import React, {useState} from 'react'
import Review from './Review'

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
    reply: 'Thank you for your kind words, Alex! Looking forward to serving you again.'
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
    reply: ''
  },
]

const ChefReviews = ({ isChef }) => {
  const [allReviews, setAllReviews] = useState(dummyReviews);

  const changeReviewReply = async (review, updatedReply) => {
    const index = allReviews.findIndex(r => r.id === review.id);
    if (index !== -1) {
      let updatedReply = allReviews.at(index);
      updatedReply.reply = updatedReply;
      const res = await axios.put(
        'http://127.0.0.1:3001/api/v1/users/login',
        JSON.stringify(updatedReply)
      )
      setAllReviews([...allReviews.slice(0, index), updatedReply, ...allReviews.slice(index + 1)])
    }
  }

  return (
    <div className="flex flex-col grow">
      {allReviews.map((review) => (
        <Review changeReviewReply={changeReviewReply} key={review.id} review={review} isChef={isChef} />
      ))}
    </div>
  )
}

export default ChefReviews