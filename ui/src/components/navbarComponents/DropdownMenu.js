import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const DropdownMenu = () => {
  const authCtx = useContext(AuthContext)
  const navigation = useNavigate()

  return (
    //   {authCtx.isAdmin  && ()} bu eklencek chefcontrol için
    <ul className="absolute right-0 mt-11  bg-white shadow-lg rounded-md  text-green-800 w-48 scale-125 z-10 text-sm">
      <li className="mb-2 hover:bg-gray-100">
        <div
          onClick={() => navigation('/profile')}
          className="w-full text-left p-4 "
        >
          Profile
        </div>
      </li>

      <li className="mb-2 hover:bg-gray-100">
        <div
          onClick={() => navigation('/favorites')}
          className="w-full text-left p-4"
        >
          Favorites
        </div>
      </li>
      <li className="mb-2 hover:bg-gray-100">
        <div
          onClick={() => navigation('/orders')}
          className="w-full text-left p-4"
        >
          Orders
        </div>
      </li>
      <li className="mb-2 hover:bg-gray-100">
        <div
          onClick={() => navigation('/settings')}
          className="w-full text-left p-4"
        >
          Settings
        </div>
      </li>
      <li className="mb-2 hover:bg-gray-100">
        <div
          onClick={() => navigation('/bechef')}
          className="w-full text-left p-4"
        >
          Be Chef
        </div>
      </li>

      <li className="mb-2 hover:bg-gray-100">
        <div
          onClick={() => navigation('/admin/chefcontrol')}
          className="w-full text-left p-4"
        >
          Chef Control
        </div>
      </li>

      <li className="mb-2 hover:bg-gray-100">
        <div
          onClick={authCtx.onLogout}
          className="w-full text-left text-sm p-4"
        >
          Logout
        </div>
      </li>
    </ul>
  )
}

export default DropdownMenu
