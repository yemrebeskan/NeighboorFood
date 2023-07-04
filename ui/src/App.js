import { Fragment, useContext, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/nav-bar'
import SignInPage from './components/homepageComponents/SignInPage'
import Footer from './components/footer'

import AuthContext from './context/AuthContext'
import Content from './Content'

const App = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <div className={authCtx.isOnClickedSignButton ? 'blur-sm ' : ''}>
          <NavBar />
        </div>
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
        <Content />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
