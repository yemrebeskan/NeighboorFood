import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/nav-bar';
import ChefPage from './pages/ChefPage';

import HomePage from './pages/homepage'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chef/:id" element={<ChefPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;

