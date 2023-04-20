import React from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs'

const Review = ({ review }) => {
  const { reviewer, date, rating, comment, menuItem } = review

  const starElements = []
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starElements.push(<BsStarFill key={i} className="text-yellow-400" />)
    } else {
      starElements.push(<BsStar key={i} className="text-yellow-400" />)
    }
  }

  const hiddenName = `${reviewer.firstName[0]}*** ${reviewer.lastName[0]}***`

  return (
    <div className="mx-8 bg-white p-4 px-8 mb-4 rounded-lg">
      <div className="flex">
        <img
          src={reviewer.profileImage}
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
      <p className="text-right mt- font-semibold">{menuItem}</p>
    </div>
  )
}

export default Review
