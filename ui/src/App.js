import { Fragment, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/nav-bar'
import ChefPage from './pages/ChefPage'
import SignUpPage from './components/homepageComponents/SignUpPage'
import SignInPage from './components/homepageComponents/SignInPage'
import axios from 'axios'

import HomePage from './pages/homepage'
import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnClickedSignButton, setIsOnClickedSignButton] = useState(false)
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false)
  const [isClickedSignUpButton, setIsClickedSignUpButton] = useState(false)

  const signupHandler = async (signUpInfo) => {
    const res = await axios.post(
      'http://localhost:3000/api/v1/users/signup',
      signUpInfo
    )
    console.log(res)
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
  const exitHandler = () => {
    setIsLoggedIn(false)
    setIsClickedLogInButton(false)
    setIsClickedSignUpButton(false)
    setIsOnClickedSignButton((prevState) => !prevState)
  }

  return (
    <div className="">
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
        <div className="flex justify-center">
          {isClickedSignUpButton && (
            <div className="fixed blur-none mr-96 z-40">
              <SignUpPage
                onSignUp={signupHandler}
                onClickSignExit={exitHandler}
              ></SignUpPage>
            </div>
          )}
          {isClickedLogInButton && (
            <div className="fixed mb-40 mr-96 blur-none z-50">
              <SignInPage
                onLogin={loginHandler}
                onClickSignExit={exitHandler}
              />
            </div>
          )}
        </div>

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
