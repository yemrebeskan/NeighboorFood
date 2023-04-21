import { Fragment, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/nav-bar'
import ChefPage from './pages/ChefPage'

import HomePage from './pages/homepage'
import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chef/:id" element={<ChefPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
