import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  isOnClickedSignButton: false,
  isClickedLogInButton: false,
  isClickedSignUpButton: false,
  userRole: null,
  
  isChef: false,
  chefId: null,
  userId: null,

  onLogout: () => {},
  onLogin: () => {},
  handleLogin: () => {},
  handleSignUp: () => {},
  exitHandler: () => {},
  onSignUp: () => {},
  setUserData: () => {},
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnClickedSignButton, setIsOnClickedSignButton] = useState(false)
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false)
  const [isClickedSignUpButton, setIsClickedSignUpButton] = useState(false)
  const [userRole, setUserRole] = useState(null)
  //const [chefId, setChefId] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem('uid')
    if (uid !== undefined && uid !== null) {
      setIsLoggedIn(true)
    }
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem('uid')
    localStorage.removeItem('userInfo')
    setIsLoggedIn(false)
  }

  const handleLogin = () => {
    setIsClickedLogInButton((prevState) => !prevState);
    setIsOnClickedSignButton((prevState) => !prevState);
  }

  const handleSignUp = () => {
    setIsClickedSignUpButton((prevState) => !prevState);
    setIsOnClickedSignButton((prevState) => !prevState);
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

  const setUserData = (role, id) => {
    //console.log('Setting userRole and chefId:', role, id);
    setUserRole(role)
    //setChefId(id);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isOnClickedSignButton: isOnClickedSignButton,
        isClickedLogInButton: isClickedLogInButton,
        isClickedSignUpButton: isClickedSignUpButton,
        userRole: userRole,
        //chefId: chefId,
        setUserData: setUserData,
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
