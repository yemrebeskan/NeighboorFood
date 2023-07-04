import { Fragment, useContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/nav-bar';
import ChefPage from './pages/ChefPage';
import SignUpPage from './components/homepageComponents/SignUpPage';
import SignInPage from './components/homepageComponents/SignInPage';
import Footer from './components/footer';
import HomePage from './pages/homepage';
import Favorites from './pages/Favorites';
import AuthContext from './context/AuthContext';
import Orders from './pages/Orders';
import BeChefPage from './pages/BeChefPage';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ControlChef from './pages/adminpage/ControlChef';
import PastOrders from './pages/PastOrders';
import MenuConfirmation from './pages/MenuConfirmation';
import MenuCompleted from './pages/MenuCompleted';
import PrivacyPage from './pages/PrivacyPage';
import CareersPage from './pages/CareersPage'; 
import TermsOfServicePage from './pages/TermsOfServicePage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  const authCtx = useContext(AuthContext);

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
            <Route path="/menuconfirmation" element={<MenuConfirmation />}></Route>
            <Route path="/menucompleted" element={<MenuCompleted />}></Route>
            <Route path="/privacy" element={<PrivacyPage />} /> 
            <Route path="/careers" element={<CareersPage />} /> 
            <Route path="/terms" element={<TermsOfServicePage />} /> 
            <Route path="*" element={<ErrorPage message="Page not found" />} />
          </Routes>
          <div className="flex-grow">&nbsp;</div>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;