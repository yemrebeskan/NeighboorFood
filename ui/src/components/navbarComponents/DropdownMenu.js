import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const DropdownMenu = ({ user }) => {
  const authCtx = useContext(AuthContext)
  const navigation = useNavigate()

  return (
    //   {authCtx.isAdmin  && ()} bu eklencek chefcontrol için
    //  {authCtx.isChef  && ()} bu eklencek menuconfirmation için
    <>
    {user === null ? ( <div></div> ):(<ul className="absolute sm:right-7 right-5 md:mt-12 mt-16 bg-white shadow-lg rounded-md text-green-800 md:w-48 w-36 scale-125 z-10 sm:text-sm text-xs">
    <div className=" mt-2">{user.name} {user.surname}</div>
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

      {!user?.isAdmin && !user.isChef ? (
        <li className="hover:bg-gray-100">
          <div
            onClick={() => navigation('/bechef')}
            className="w-full text-left p-4"
          >
            Be Chef
          </div>
        </li>
      ) : ( !user?.isAdmin && (
        <li className="hover:bg-gray-100">
          <div
            onClick={() => navigation('/menuconfirmation')}
            className="w-full text-left p-4"
          >
            Menu Confirmation
          </div>
        </li>
      ))}

      {user.isChef && (
        <li className="hover:bg-gray-100">
          <div
            onClick={() => navigation('/menucompleted')}
            className="w-full text-left p-4"
          >
            Menu Completed
          </div>
        </li>
      )}

      {user.isAdmin && (
        <li className="hover:bg-gray-100">
          <div
            onClick={() => navigation('/admin/chefcontrol')}
            className="w-full text-left p-4"
          >
            Chef Control
          </div>
        </li>
      )}

      <li className="hover:bg-gray-100">
        <div
          onClick={() => navigation('/settings')}
          className="w-full text-left p-4"
        >
          Settings
        </div>
      </li>
      <li className="hover:bg-gray-100 rounded-b-md">
        <div
          onClick={() => {
            authCtx.onLogout()
            navigation('/')
          }}
          className="w-full text-left text-sm p-4"
        >
          Logout
        </div>
      </li>
    </ul> )}
    
  </>)
}

export default DropdownMenu
