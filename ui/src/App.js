import { Fragment, useContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/nav-bar'
import ChefPage from './pages/ChefPage'
import SignUpPage from './components/homepageComponents/SignUpPage'
import SignInPage from './components/homepageComponents/SignInPage'
import Footer from './components/footer'
import HomePage from './pages/homepage'
import Favorites from './pages/Favorites'
import './App.css'
import AuthContext from './context/AuthContext'
import Orders from './pages/Orders'
import BeChefPage from './pages/BeChefPage'
import AboutUs from './pages/AboutUs'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ControlChef from './pages/adminpage/ControlChef'
import PastOrders from './pages/PastOrders'

const App = () => {
  const authCtx = useContext(AuthContext)

  return (
    <div className="">
      <div>
        <BrowserRouter>
          <div className={authCtx.isOnClickedSignButton ? 'blur-sm ' : ''}>
            <NavBar />
          </div>
          {/* <div className="border-2 border-green-900"> */}
            {authCtx.isClickedSignUpButton && (
              <div className="fixed top-[50%] left-[50%] flex justify-center items-center blur-none z-40">
                <SignUpPage />
              </div>
            )}
            {authCtx.isClickedLogInButton && (
              <div className="fixed top-[50%] left-[50%] flex justify-center items-center blur-none z-50">
                <SignInPage />
              </div>
            )}
          {/* </div> */}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chef/:id" element={<ChefPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/pastorders" element={<PastOrders />} />
            <Route path="/bechef" element={<BeChefPage />}></Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/admin/chefcontrol" element={<ControlChef />}></Route>
          </Routes>
        </BrowserRouter>
        <div className={authCtx.isOnClickedSignButton ? 'blur-sm ' : ''}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
