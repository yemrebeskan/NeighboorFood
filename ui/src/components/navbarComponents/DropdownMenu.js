import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const DropdownMenu = ({ setIsLoggedIn }) => {
  const authCtx = useContext(AuthContext)

  return (
    <ul className="absolute right-0 mt-11  bg-white shadow-lg rounded-md  text-green-800 w-48 scale-125 z-10 text-sm">
      <li className="mb-2 hover:bg-gray-100">
        <button
          onClick={() => console.log('Settings')}
          className="w-full text-left p-4 "
        >
          Profile
        </button>
      </li>

      <li className="mb-2 hover:bg-gray-100">
        <Link to="/favorites">
          <button
            onClick={() => console.log('Favorites')}
            className="w-full text-left p-4"
          >
            Favorites
          </button>
        </Link>
      </li>
      <li className="mb-2 hover:bg-gray-100">
        <Link to="/orders">
          <button
            onClick={() => console.log('Settings')}
            className="w-full text-left p-4"
          >
            Orders
          </button>
        </Link>
      </li>
      <li className="mb-2 hover:bg-gray-100">
        <button
          onClick={() => console.log('Settings')}
          className="w-full text-left p-4"
        >
          Settings
        </button>
      </li>
      <li className="mb-2 hover:bg-gray-100">
        <Link to="/bechef">
          <button
            onClick={() => console.log('Settings')}
            className="w-full text-left p-4"
          >
            Be Chef
          </button>
        </Link>
      </li>
      <li className="mb-2 hover:bg-gray-100">
        <button
          onClick={authCtx.onLogout}
          className="w-full text-left text-sm p-4"
        >
          Logout
        </button>
      </li>
    </ul>
  )
}

export default DropdownMenu
