import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

import profileImage from './adminpage/image.jpg'
import { FiEdit2 } from 'react-icons/fi'
import ErrorModal from '../errorModal/errorModal'
const Profile = () => {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const inputRef = useRef(null)

  const uid = localStorage.getItem('uid')
  const [image, setImage] = useState(profileImage)
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/api/v1/users/${uid}`
        )

        setImage(response.data.data.user.image)
        setUser(response.data.data.user)
        setAddress(response.data.data.user.district)
        console.log(response.data.data.user.district)
        console.log(response.data.data.user)
      } catch (error) {
        setError('Error fetching user data. Please try again later.')
        console.log(error)
      }
    }
    fetchUser()
  }, [uid])

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate('/')
    }
  }, [authCtx.isLoggedIn, navigate])

  const [address, setAddress] = useState(user.district)
  const handleProfileAddressChange = async (event) => {
    event.preventDefault()
    const addressPush = {
      adress: address,
    }
    console.log('Yeni adres gönderme öncesi:', addressPush)
    try {
    
      console.log('Yeni adres gönderme öncesi:', address)
      const response = await axios.put(
        `http://127.0.0.1:3001/api/v1/settings/${uid}/address`,
        addressPush
      )
      //window.location.reload()
      console.log('Yeni adres gönderildi:', address)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddressInputChange = (event) => {
    
    setAddress(event.target.value)
  }

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0]
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
    const reader = new FileReader()
    if (file && allowedExtensions.exec(file.name)) {
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result.split(',')[1]
          const imagedata = {
            image: base64Data,
          }
          const response = await axios.put(
            `http://127.0.0.1:3001/api/v1/settings/${uid}/image`,
            imagedata
          )
          window.location.reload()
        } catch (error) {
          console.log(error)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setError('Desteklenmeyen dosya formatı!')
      console.log('Desteklenmeyen dosya formatı!')
    }
  }
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const handlePhoneInputChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleProfilePhoneChange = async (event) => {
    event.preventDefault()
    console.log( phoneNumber)
    console.log(uid)
    const phonePush = {
      phoneNumber: phoneNumber,
    }
    console.log(phonePush)
    try {
      
      console.log('Yeni telefon numarası gönderme öncesi:', phoneNumber)
      const response = await axios.put(
        `http://127.0.0.1:3001/api/v1/settings/${uid}/phoneNumber`,
        phonePush
      )
      //window.location.reload()
      console.log('Yeni telefon numarası gönderildi:', phoneNumber)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoToSettings = () => {
    navigate('/settings')
  }

  const handleGoToOrderHistory = () => {
    navigate('/pastorders')
  }

  const handleBecomeChef = () => {
    navigate('/bechef')
  }

  const handleMyChefPage = () => {
    navigate(`/chef/${uid}`)
  }

  return (
    <div className="flex flex-col items-center justify-center mb-64 max-w mx-auto mt-10 mb-10 p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center">
        <div className="m-8  ml-24 right-0 ">
          <div className="mb-4 relative">
            <img
              src={`data:image/png;base64,${image}`}
              alt="Profile"
              className="rounded-full w-32 h-32 md:w-32 md:h-32"
            />
            <div className="relative">
              <FiEdit2
                className="text-blue-500 absolute left-28 bottom-0 cursor-pointer"
                onClick={() => inputRef.current.click()}
              />
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleProfileImageChange}
                style={{ display: 'none' }}
                ref={inputRef}
              />
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-bold mb-2">
            {user.name} {user.surname}
          </h2>
          {!user?.isAdmin && user.isChef ? (
            <button
              className="mb-2 md:mb-0 md:mr-2 bg-teal-500 text-white px-4 py-2 rounded"
              onClick={handleMyChefPage}
            >
              My Chef Page
            </button>
          ) : (!user?.isAdmin &&(
            <button
              className="mb-2 md:mb-0 md:mr-2 bg-teal-500 text-white px-4 py-2 rounded"
              onClick={handleBecomeChef}
            >
              Be Chef
            </button>
          ))}
        </div>
        <div className="m-8 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <span className="mr-2">Address:</span>
            <textarea
              defaultValue={address}
              onChange={handleAddressInputChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm md:text-base resize-none flex-grow"
              rows={2}
            />
          </div>
          <form onSubmit={handleProfileAddressChange}>
          <button
          type="submit"
            className="px-3 py-1 mb-5 bg-teal-500 text-white rounded text-sm md:text-base"
          >
            Change Address
          </button>
          </form>
          <div className="flex justify-center md:justify-between">
            <button
              className="mb-2 md:mb-0 md:mr-2 bg-teal-500 text-white px-4 py-2 rounded"
              onClick={handleGoToOrderHistory}
            >
              Past Orders
            </button>
          </div>
        </div>
        <div className="m-8 mt-16 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="mr-2">Phone Number:</span>
            <textarea
              defaultValue={user.phoneNumber}
              onChange={handlePhoneInputChange}
              className="border border-gray-300 rounded px-2 py-1  h-8 w-32  text-sm md:text-base resize-none flex-grow"
              rows={1}
            />
          </div>
          <form onSubmit={handleProfilePhoneChange}>
          <button
            className="px-3 py-1 mb-5 mt-4 bg-teal-500 text-white rounded text-sm md:text-base"
          >
          
            Change Phone Number
          </button>
          </form>
          <div className="flex justify-center md:justify-between">
            <button
              className="mb-2 md:mb-0 md:mr-2 bg-teal-500 text-white px-4 py-2 rounded"
              onClick={handleGoToSettings}
            >
              Settings
            </button>
          </div>
        </div>
        {error && (
          <ErrorModal
            isOpen={error !== null}
            errorMessage={error}
            onClose={() => setError(null)}
          />
        )}
      </div>
    </div>
  )
}

export default Profile
