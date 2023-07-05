import React, { useState } from 'react'
import defaultimage from './image.jpg'
import axios from 'axios'
import ErrorModal from '../../errorModal/errorModal'
import { createImageFromBase64 } from '../../utils/convertToFileToBase64'

const AnounceAChef = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [error, setError] = useState(null)

  const handleDuyurClick = () => {
    setIsConfirmationOpen(true)
  }

  const handleRetClick = async () => {
    setIsConfirmationOpen(false)
    props.onUpdate(props.data.id)
    setIsSubmitted(false)

    try {
      const res = await axios.delete(
        `http://127.0.0.1:3001/api/v1/admin/application/${props.data.id}`
      )
    } catch (error) {
      setError(
        'An error occurred while rejecting the application. Please try again later.'
      )
    }
  }

  const handleConfirmation = async (confirmation) => {
    setIsConfirmationOpen(false)
    const application = {
      aboutNewChef: props.data.aboutNewChef,
      country: props.data.country,
      streetAddress: props.data.streetAddress,
      city: props.data.city,
    }
    console.log(application)
    if (confirmation === 'Evet') {
      const res = await axios.post(
        `http://127.0.0.1:3001/api/v1/admin/application/${props.data.id}`,
        application
      )

      if (res.data.status === 'success') {
        props.onUpdate(props.data.id)
        setIsSubmitted(false)
      } else {
        setError(
          'An error occurred while confirming the application. Please try again later.'
        )
      }
    }
  }

  if (isSubmitted) {
    return null
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
      <div className="rounded-full overflow-hidden h-16 w-16 m-2">
        <img
          src={
            props.data.Image
              ? createImageFromBase64(props.data.Image)
              : defaultimage
          }
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-center sm:text-left">
        <p className="font-bold">
          {props.data.name} {props.data.surname}
        </p>

        <p className="text-sm text-gray-500">
          Country : {props.data.country} , City: {props.data.city}
        </p>
        <p className="text-sm text-gray-500">
          Street Address : {props.data.streetAddress}
        </p>
        <p className="text-sm text-gray-500">
          About : {props.data.aboutNewChef}
        </p>
      </div>
      <div className="flex justify-center sm:justify-end w-full sm:w-auto">
        <button
          className="bg-green-500 hover:bg-green-700 text-white px-8 py-2 rounded"
          onClick={handleDuyurClick}
        >
          Adayı Onayla
        </button>
      </div>

      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-500">
          <div className="bg-white p-4 rounded shadow">
            <p>İşlemi onaylıyor musunuz?</p>
            <div className="flex justify-end mt-4 mr-8 ml-8 mb-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleConfirmation('Evet')}
              >
                Evet
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={() => handleConfirmation('Hayır')}
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="bg-red-500 hover:bg-red-700 text-white px-8 py-2 rounded"
        onClick={handleRetClick}
      >
        Adayı Reddet
      </button>

      {error && (
        <ErrorModal
          isOpen={error !== null}
          errorMessage={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  )
}

export default AnounceAChef
