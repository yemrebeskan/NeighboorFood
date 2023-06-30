// ErrorPage.js
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function ErrorPage({ message }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 bg-gray-200 -mt-20">
      <h2 className="text-3xl font-semibold">Oops!</h2>
      <p className="text-lg">{message}</p>
      <button 
        className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  )
}

export default ErrorPage
