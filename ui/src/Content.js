import { Route, Routes, useLocation } from 'react-router-dom'
import Orders from './pages/Orders'
import BeChefPage from './pages/BeChefPage'
import AboutUs from './pages/AboutUs'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ControlChef from './pages/adminpage/ControlChef'
import PastOrders from './pages/PastOrders'
import MenuConfirmation from './pages/MenuConfirmation'
import MenuCompleted from './pages/MenuCompleted'
import PrivacyPage from './pages/PrivacyPage'
import CareersPage from './pages/CareersPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/homepage'
import Favorites from './pages/Favorites'
import ChefPage from './pages/ChefPage'

export default function Content() {
  const location = useLocation()
  return (
    <>
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
      <div
        className={
          location.pathname === '/' ? `flex-grow bg-orange-100` : 'flex-grow'
        }
      >
        &nbsp;
      </div>
    </>
  )
}
