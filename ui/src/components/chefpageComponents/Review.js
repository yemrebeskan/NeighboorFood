import React, { useState } from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs'

const Review = ({ review, isChef, changeReviewReply }) => {
  const { reviewer, date, rating, comment, menuItem, reply } = review

  const [replyText, setReplyText] = useState(reply || '')
  const [isReplying, setIsReplying] = useState(false)

  const handleReply = () => {
    // Save the reply to the server here
    changeReviewReply(review, replyText)
    setIsReplying(false)
  }

  const starElements = []
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starElements.push(<BsStarFill key={i} className="text-yellow-400" />)
    } else {
      starElements.push(<BsStar key={i} className="text-yellow-400" />)
    }
  }

  const hiddenName = `${reviewer.name[0]}*** ${reviewer.surname[0]}***`

  return (
    <div className="mx-8 bg-white p-4 px-8 mb-4 rounded-lg">
      <div className="flex">
        <img
          src={reviewer.image}
          alt={hiddenName}
          className="w-16 h-16 object-cover rounded-full mr-4"
        />
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-row items-center gap-8">
              <h3 className="font-semibold ">{hiddenName}</h3>
              <div className="flex items-center">
                {starElements}
                <span className="ml-2 font-semibold">{rating}</span>
              </div>
            </div>
            <p className="text-sm opacity-60">{date}</p>
          </div>
        </div>
      </div>
      <p className="mt-4 px-8">{comment}</p>
      {reply && (
        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4 px-8">
          {reply}
        </p>
      )}
      {isChef && (
        <div className="mt-4">
          {isReplying && (
            <div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full h-20 p-2 rounded border border-gray-300 focus:border-green-500"
              />
              <button
                onClick={handleReply}
                className="mt-2 bg-green-800 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          )}
          {!isReplying &&
            (typeof review.reply === 'undefined' ||
              review.reply.length === 0) && (
              <button
                onClick={() => setIsReplying(true)}
                className="mt-2 bg-green-800 text-white px-4 py-2 rounded-md"
              >
                Reply
              </button>
            )}
        </div>
      )}
    </div>
  )
}

export default Review
