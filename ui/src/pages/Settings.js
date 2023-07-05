import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ErrorModal from '../errorModal/errorModal'
const Settings = () => {
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [deleteAccount, setDeleteAccount] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const uid = localStorage.getItem('uid')

  const authCtx = useContext(AuthContext)

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/api/v1/users/${uid}`
        )
        setUser(response.data.data.user)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setError('Error fetching user data')
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [uid])

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await axios
          .put(`http://127.0.0.1:3001/api/v1/settings/${uid}/password`, {
            password: currentPassword,
            newPassword: newPassword,
          })
          .then(() => {
            navigate('/')
          })
      } catch (error) {
        console.log(error) // Hata durumunda
      }
    } else {
      setError('New password and new password confirmation do not match')
    }
  }
  const handleDeleteAccount = async () => {

    if (deleteAccount) {
      try {
        await axios
          .delete(`http://127.0.0.1:3001/api/v1/settings/${uid}`)
          .then(() => {
            authCtx.onLogout() // Fonksiyonu çağır
            navigate('/')
          }) // Hesap silindikten sonra yönlendirme
      } catch (error) {
        console.log(error) // Hata durumunda
        setError('Error deleting account')
      }
    } else {
      setError('Please confirm account deletion')
    }
  }
  const closeModal = () => {
    setError(null)
  }

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate('/')
    }
  }, [authCtx.isLoggedIn, navigate])

  return (
    <div style={{ minHeight: '400px', position: 'relative' }}>
      {isLoading ? (
      <div className="absolute flex items-center justify-center inset-1/4">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
    </div>      
    ):(
    
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Şifre Değiştirme */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Change Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-2"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={handlePasswordChange}
        >
          Change Password
        </button>
      </div>

      {!user?.isAdmin && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Chef Operations</h2>
          {user?.isChef ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
              onClick={() => navigate('/')}
            >
              Resignation from Chef
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
              onClick={() => navigate('/bechef')}
            >
              Be Chef
            </button>
          )}
        </div>
      )}

      {/* Hesap Silme */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Delete Account</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox mr-2"
            checked={deleteAccount}
            onChange={() => setDeleteAccount(!deleteAccount)}
          />
          <span>I want to delete my account</span>
        </label>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
      <ErrorModal
        isOpen={error !== null}
        errorMessage={error}
        onClose={closeModal}
      />
      </div>)}
    </div>
  )
}

export default Settings
