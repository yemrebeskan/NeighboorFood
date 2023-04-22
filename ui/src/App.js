import { Fragment, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/nav-bar'
import ChefPage from './pages/ChefPage'
import SignUpPage from './components/homepageComponents.js/SignUpPage'
import SignInPage from './components/homepageComponents.js/SignInPage'

import HomePage from './pages/homepage'
import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnClickedSignButton, setIsOnClickedSignButton] = useState(false)
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false)
  const [isClickedSignUpButton, setIsClickedSignUpButton] = useState(false)

  const signupHandler = (email, password) => {
    console.log(email, password)
    // save the database
    setIsLoggedIn(true)
    setIsClickedSignUpButton(false)
    setIsOnClickedSignButton((prevState) => !prevState)
  }

  const loginHandler = (email, password) => {
    // assump log in is successful
    console.log(email, password)
    setIsLoggedIn(true)
    setIsClickedLogInButton(false)
    setIsOnClickedSignButton((prevState) => !prevState)
  }

  return (
    <div className="relative">
      <div>
        <div className={isOnClickedSignButton ? 'blur-sm' : ''}>
          <NavBar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setIsOnClickedSignButton={setIsOnClickedSignButton}
            setIsClickedLogInButton={setIsClickedLogInButton}
            setIsClickedSignUpButton={setIsClickedSignUpButton}
          />
        </div>
        {isClickedSignUpButton && (
          <div className="absolute ml-40 blur-none block z-40">
            <SignUpPage onSignUp={signupHandler}></SignUpPage>
          </div>
        )}
        {isClickedLogInButton && (
          <div className="absolute mb-40 ml-40 blur-none block z-50">
            <SignInPage onLogin={loginHandler}></SignInPage>
          </div>
        )}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isLoggedIn={isLoggedIn}
                  isOnClickedSignButton={isOnClickedSignButton}
                />
              }
            />
            <Route
              path="/chef/:id"
              element={
                <ChefPage isOnClickedSignButton={isOnClickedSignButton} />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
