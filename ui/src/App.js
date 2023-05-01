import { Fragment, useContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './components/nav-bar'
import ChefPage from './pages/ChefPage'
import SignUpPage from './components/homepageComponents/SignUpPage'
import SignInPage from './components/homepageComponents/SignInPage'
import Footer from './components/footer'
import HomePage from './pages/homepage'
import Favorites from './components/navbarComponents/Favorites'
import './App.css'
import AuthContext from './context/AuthContext'
import Orders from './components/navbarComponents/Orders'

const App = () => {
  const authCtx = useContext(AuthContext)

  return (
    <div className="">
      <div>
        <BrowserRouter>
        <div className={authCtx.isOnClickedSignButton ? 'blur-sm ' : ''}>
          <NavBar />
        </div>
        <div className="flex justify-center">
          {authCtx.isClickedSignUpButton && (
            <div className="fixed blur-none mr-96 z-40">
              <SignUpPage></SignUpPage>
            </div>
          )}
          {authCtx.isClickedLogInButton && (
            <div className="fixed mb-40 mr-96 blur-none z-50">
              <SignInPage />
            </div>
          )}
        </div>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chef/:id" element={<ChefPage />} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/orders" element={<Orders/>} />
          </Routes>
        </BrowserRouter>
        <div className={authCtx.isOnClickedSignButton ? 'blur-sm ' : ''}>
          <Footer></Footer>
        </div>
      </div>
    </div>
  )
}

export default App
