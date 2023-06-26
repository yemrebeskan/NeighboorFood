import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa'

const ChefAbout = ({ isChef, about, phone, email }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [aboutText, setAboutText] = useState(about)
  const [phoneText, setPhoneText] = useState(phone)
  const [emailText, setEmailText] = useState(email)

  const handleSave = () => {
    // Save changes to the server here
    setIsEditing(false)
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            cols={100}
            style={{ minWidth: 1300 }}
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="mt-2 w-full h-32 rounded-md border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          ></textarea>
          <input
            type="tel"
            value={phoneText}
            onChange={(e) => setPhoneText(e.target.value)}
            className="mt-2 w-full h-8 rounded-md border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            className="mt-2 w-full h-8 rounded-md border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
        </div>
      ) : (
        <div>
          <pre className="font-light whitespace-pre-wrap">{aboutText}</pre>
          <p>{phoneText}</p>
          <p>{emailText}</p>
        </div>
      )}
      {isChef && (
        <div className='flex flex-row-reverse'>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className=" mt-2 mb-2 bg-green-800 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? 'Save' : <FaPen className="fas fa-pen"></FaPen>}
          </button>
        </div>
      )}
    </div>
  )
}

export default ChefAbout