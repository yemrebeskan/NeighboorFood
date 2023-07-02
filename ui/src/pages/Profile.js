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

  const handleProfileAddressChange = () => {
    // Profil adresi değiştirme işlemleri
  }

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0]
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i

    if (file && allowedExtensions.exec(file.name)) {
      const formData = new FormData()
      formData.append('image', file)
      console.log(formData)
      try {
        const response = await axios.put(
          `http://127.0.0.1:3001/api/v1/settings/${uid}/image`,
          formData
        )
        // İstek başarılı olduğunda yapılacak işlemler
        console.log('Resim yüklendi!')
        navigate('/profile')
      } catch (error) {
        setError('Resim yüklenirken hata oluştu!')
        console.error('Resim yüklenirken hata oluştu:', error)
      }
    } else {
      setError('Desteklenmeyen dosya formatı!')
      console.log('Desteklenmeyen dosya formatı!')
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

  return (
    <div className="flex flex-col items-center justify-center mb-64 max-w mx-auto mt-10 mb-10 p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
        <div className="m-8  ml-24 right-0 ">
          <div className="mb-4 relative">
            <img
              src={image}
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

          <button
            className="mb-2 md:mb-0 md:mr-2 bg-teal-500 text-white px-4 py-2 rounded"
            onClick={handleBecomeChef}
          >
            Chef Ol
          </button>
          <button
            className="mb-2 md:mb-0 md:mr-2 bg-teal-500 text-white px-4 py-2 rounded"
            onClick={handleGoToSettings}
          >
            Ayarlar
          </button>
        </div>
        <div className="m-8 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <span className="mr-2">Adres:</span>
            <textarea
              defaultValue="Kullanıcının Adresi"
              className="border border-gray-300 rounded px-2 py-1 text-sm md:text-base resize-none flex-grow"
              rows={4}
            />
          </div>
          <button className="px-3 py-1 mb-5 bg-teal-500 text-white rounded text-sm md:text-base">
            Change Address
          </button>
          <div className="flex justify-center md:justify-between">
            <button
              className="mb-2 md:mb-0 md:mr-2 bg-teal-500 text-white px-4 py-2 rounded"
              onClick={handleGoToOrderHistory}
            >
              Sipariş Geçmişi
            </button>
          </div>
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
  )
}

export default Profile
