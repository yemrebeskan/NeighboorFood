import React from 'react'

const DropdownMenu = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false)
  }

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
        <button
          onClick={() => console.log('Favorites')}
          className="w-full text-left p-4"
        >
          Favorites
        </button>
      </li>
      <li className="mb-2 hover:bg-gray-100">
        <button
          onClick={() => console.log('Settings')}
          className="w-full text-left p-4"
        >
          Orders
        </button>
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
        <button
          onClick={() => console.log('Settings')}
          className="w-full text-left p-4"
        >
          Be Chef
        </button>
      </li>
      <li className="mb-2 hover:bg-gray-100">
        <button onClick={handleLogout} className="w-full text-left text-sm p-4">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default DropdownMenu
