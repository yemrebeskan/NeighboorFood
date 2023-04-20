import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/homepageComponents.js/nav-bar'

import HomePage from './pages/homepage'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <NavBar></NavBar>
            <Routes>
                <Route path="/homePage" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
