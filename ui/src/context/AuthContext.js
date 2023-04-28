import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  isOnClickedSignButton: false,
  isClickedLogInButton: false,
  isClickedSignUpButton: false,
  onLogout: () => {},
  onLogin: () => {},
  handleLogin: () => {},
  handleSignUp: () => {},
  exitHandler: () => {},
  onSignUp: () => {},
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnClickedSignButton, setIsOnClickedSignButton] = useState(false)
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false)
  const [isClickedSignUpButton, setIsClickedSignUpButton] = useState(false)
  useEffect(() => {
    const uid = localStorage.getItem('uid')
    if (uid !== undefined && uid !== null) {
      setIsLoggedIn(true)
    }
  }, [])
  const logoutHandler = () => {
    localStorage.removeItem('uid')
    localStorage.removeItem('userInfo')
    setIsLoggedIn(false)
  }

  const handleLogin = () => {
    setIsClickedLogInButton((prevState) => !prevState)
    setIsOnClickedSignButton((prevState) => !prevState)
  }

  const handleSignUp = () => {
    setIsClickedSignUpButton((prevState) => !prevState)
    setIsOnClickedSignButton((prevState) => !prevState)
  }

  const signUpHandler = () => {
    setIsLoggedIn(true)
    setIsClickedSignUpButton(false)
    setIsOnClickedSignButton((prevState) => !prevState)
  }

  const loginHandler = () => {
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
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isOnClickedSignButton: isOnClickedSignButton,
        isClickedLogInButton: isClickedLogInButton,
        isClickedSignUpButton: isClickedSignUpButton,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        handleLogin: handleLogin,
        handleSignUp: handleSignUp,
        exitHandler: exitHandler,
        onSignUp: signUpHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
