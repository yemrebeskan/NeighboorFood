import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'

const DropdownMenu = ({user}) => {
  const authCtx = useContext(AuthContext)
  const navigation = useNavigate()

  return (
    <ul className="absolute sm:right-7 right-5 md:mt-12 mt-16 bg-white shadow-lg rounded-md text-green-800 md:w-48 w-36 scale-125 z-10 sm:text-sm text-xs">
      <li className="hover:bg-gray-100 rounded-t-md">
        <div
          onClick={() => navigation('/profile')}
          className="w-full text-left p-4"
        >
          Profile
        </div>
      </li>

      <li className="hover:bg-gray-100">
        <div
          onClick={() => navigation('/favorites')}
          className="w-full text-left p-4"
        >
          Favorites
        </div>
      </li>
      <li className="hover:bg-gray-100">
        <div
          onClick={() => navigation('/orders')}
          className="w-full text-left p-4"
        >
          Orders
        </div>
      </li>
      <li className="hover:bg-gray-100">
        <div
          onClick={() => navigation('/settings')}
          className="w-full text-left p-4"
        >
          Settings
        </div>
      </li>
      {!user?.isChef && (
        <li className="hover:bg-gray-100">
          <div
            onClick={() => navigation('/bechef')}
            className="w-full text-left p-4"
          >
            Be Chef
          </div>
        </li>
      )}
      {user?.isAdmin && (
      <li className="hover:bg-gray-100">
        <div
          onClick={() => navigation('/admin/chefcontrol')}
          className="w-full text-left p-4"
        >
          Chef Control
        </div>
      </li>)}

      <li className="hover:bg-gray-100 rounded-b-md">
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
