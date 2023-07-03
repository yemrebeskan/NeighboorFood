import React from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
const CareersPage = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div
      className={
        authCtx.isOnClickedSignButton
          ? 'blur-sm careers-page-container min-h-[60vh] '
          : 'careers-page-container min-h-[60vh]'
      }
    >
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Careers</h1>
        <p className="text-lg mb-4">
          We are always looking for talented individuals to join our team.
        </p>
        <p className="text-lg mb-4">Explore our current job openings below:</p>
        <div className="bg-white shadow-md rounded p-6">
          <p className="text-gray-700">No available positions at the moment.</p>
        </div>
      </div>
    </div>
  )
}

export default CareersPage
