import React, { useState } from 'react'
import { StarIcon, XIcon } from '@heroicons/react/solid'

const ReviewModal = ({ isOpen, setIsOpen, chef, order }) => {
  const [reviewScore, setReviewScore] = useState(0)
  const [comment, setComment] = useState('')

  const handleStarClick = (i) => setReviewScore(i)

  return (
    isOpen && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Review your order from {chef.name}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{order.details}</p>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                      Leave a comment (optional)
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="comment"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-4">
              <div className="text-lg font-medium text-gray-900">
                Rate your experience
              </div>
              {[...Array(5)].map((star, i) => {
                return (
                  <StarIcon
                    key={i}
                    className={`h-6 w-6 ${
                      reviewScore > i ? 'text-yellow-500' : 'text-gray-300'
                    } cursor-pointer`}
                    onClick={() => handleStarClick(i + 1)}
                  />
                )
              })}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  setIsOpen(false)
                  // Add code to save review here
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    )
  )
}

export default ReviewModal
