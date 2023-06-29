import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './homepageComponents/logo.png';
import DropdownMenu from './navbarComponents/DropdownMenu';
import AuthContext from '../context/AuthContext';
import FoodBasket from './navbarComponents/FoodBasket';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBasket, setShowBasket] = useState(false);
  const authCtx = useContext(AuthContext);
  const uid = localStorage.getItem('uid');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/api/v1/users/${uid}`
        );
        setUser(response.data.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [uid]);

  const navigation = useNavigate();

  const toggleBasket = () => {
    setShowDropdown(false);
    setShowBasket((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setShowBasket(false);
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div className="relative z-50 bg-stone-200 mb-16 md:py-12 py-8">
      <nav className="flex justify-between container max-w-[90rem] mx-auto sm:px-8 px-2">
        <div>
          <img
            onClick={() => navigation('/')}
            src={logo}
            className="md:w-40 w-28 absolute mt-3 cursor-pointer"
            alt="Logo"
          />
        </div>
        <div className="buttons text-[10px] sm:text-[12px] md:text-[16px]">
          <div className="flex justify-end items-center">
            <Link to="/aboutus">
              <button className="text-green-700 items-end md:mr-16 sm:mr-8 mr-4 hover:text-gray-950">
                About Us
              </button>
            </Link>

            {!authCtx.isLoggedIn && (
              <div className="border-r-2 border-gray-50">
                <button
                  className="text-green-700 md:mr-5 mr-0 px-2 py-2 hover:bg-green-700 hover:text-stone-200 rounded"
                  onClick={authCtx.handleSignUp}
                >
                  SIGN UP
                </button>
              </div>
            )}

            {!authCtx.isLoggedIn && (
              <button
                className="text-green-700 md:ml-5 ml-0 items-end hover:bg-green-700 px-2 py-2 hover:text-stone-200 rounded"
                onClick={authCtx.handleLogin}
              >
                LOG IN
              </button>
            )}

            {authCtx.isLoggedIn && user?.isChef && (
              <NavLink
                to={`/chef/${uid}`}
                className="text-green-700 items-end hover:bg-green-700 px-2 py-2 sm:mr-8 mr-4 hover:text-stone-200 rounded"
              >
                My Chef Page
              </NavLink>
            )}

            {authCtx.isLoggedIn && !user?.isChef && (
              <Link to="/bechef">
                <button className="text-green-700 items-end hover:bg-green-700 px-2 py-2 sm:mr-8 mr-4 hover:text-stone-200 rounded">
                  Be a Chef
                </button>
              </Link>
            )}

            {authCtx.isLoggedIn && (
              <button className="relative md:w-10 md:h-10 w-7 h-7 md:mr-12 mr-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="md:w-10 md:h-10 w-7 h-7 hover:text-green-700 hover:cursor-pointer hover:scale-150"
                  onClick={toggleBasket}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {showBasket && <FoodBasket />}
              </button>
            )}

            {authCtx.isLoggedIn && (
              <button
                onClick={toggleDropdown}
                className="relative md:w-10 md:h-10 w-7 h-7"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="md:w-10 md:h-10 w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {showDropdown && <DropdownMenu />}
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
