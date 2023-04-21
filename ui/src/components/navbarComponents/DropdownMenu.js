import React from 'react'

  
const DropdownMenu = ( {setIsLoggedIn}) => {

    const handleLogout = () => {
        setIsLoggedIn(false);
      };

  return (
    <ul className="absolute right-0 mt-11  bg-white shadow-lg rounded-md p-4 text-green-800 w-48 scale-125">
      <li className="mb-3 hover:bg-gray-100">
        <button
          onClick={() => console.log('Settings')}
          className="w-full text-left"
        >
          Profile
        </button>
      </li>
      <li className="mb-3 hover:bg-gray-100">
        <button
          onClick={() => console.log('Favorites')}
          className="w-full text-left"
        >
          Favorites
        </button>
      </li>
      <li className="mb-3 hover:bg-gray-100">
        <button
          onClick={() => console.log('Settings')}
          className="w-full text-left"
        >
          Orders
        </button>
      </li>
      <li className="mb-3 hover:bg-gray-100">
        <button
          onClick={() => console.log('Settings')}
          className="w-full text-left"
        >
          Settings
        </button>
      </li>
      <li className="mb-3 hover:bg-gray-100">
        <button
          onClick={() => console.log('Settings')}
          className="w-full text-left"
        >
          Be Chef
        </button>
      </li>
      <li className="mb-3 hover:bg-gray-100">
        <button onClick={handleLogout} className="w-full text-left text-sm ">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default DropdownMenu
