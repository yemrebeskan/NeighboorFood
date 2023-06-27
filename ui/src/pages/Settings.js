import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [deleteAccount, setDeleteAccount] = useState(false)

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
      } catch (error) {
        console.log(error)
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
      alert('Yeni şifre ve yeni şifre tekrarı eşleşmiyor.')
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
      }
    }
  }
  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate('/')
    }
  }, [authCtx.isLoggedIn, navigate])

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Şifre Değiştirme */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Şifre Değiştirme</h2>
        <input
          type="password"
          placeholder="Eski Şifre"
          className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-2"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Yeni Şifre"
          className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Yeni Şifre Tekrar"
          className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={handlePasswordChange}
        >
          Şifre Değiştir
        </button>
      </div>

      {/* Rol Kontrolü */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Aşçılık İşlemleri</h2>
        {user?.isChef ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
            onClick={() => navigate('/')}
          >
            Aşçılıktan Çık
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
            onClick={() => navigate('/bechef')}
          >
            Aşçı Ol
          </button>
        )}
      </div>

      {/* Hesap Silme */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Hesap Silme</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox mr-2"
            checked={deleteAccount}
            onChange={() => setDeleteAccount(!deleteAccount)}
          />
          <span>Hesabımı silmek istiyorum</span>
        </label>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
          disabled={!deleteAccount}
          onClick={handleDeleteAccount}
        >
          Hesabı Sil
        </button>
      </div>
    </div>
  )
}

export default Settings
