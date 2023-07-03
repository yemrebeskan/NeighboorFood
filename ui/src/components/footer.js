// footer.js:
import { useState } from 'react'
import './footerclass.css'
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlinePhone,
} from 'react-icons/hi' // Importing icons from react-icons library
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'

const Footer = () => {
  const authCtx = useContext(AuthContext)
  const [email, setEmail] = useState(false)
  const [location, setLocation] = useState(false)
  const [callUs, setCallUs] = useState(false)
  const navigation = useNavigate()

  const displayEmail = () => {
    setEmail(!email)
    setLocation(false)
    setCallUs(false)
  }

  const displayLocation = () => {
    setLocation(!location)
    setEmail(false)
    setCallUs(false)
  }

  const displayCallUs = () => {
    setCallUs(!callUs)
    setEmail(false)
    setLocation(false)
  }

  return (
      <div className={authCtx.isOnClickedSignButton ? 'blur-sm bg-teal-900' : 'bg-teal-900'}>
        <div className="container max-w-[90rem] mx-auto footerclass flex flex-col items-center justify-center text-slate-200 p-4 space-y-6">
          <div className="text-center">
            <p className="text-2xl font-semibold mb-2">© 2023 NeighborFood</p>
            <p className="text-sm">
              We deliver quality and healthy food to your doorstep.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out"
              onClick={() => {
                navigation('/aboutus')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Who we are
            </button>
            <button
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out"
              onClick={() => {
                setEmail(true)
                setCallUs(true)
                setLocation(false)
                if (email || location || callUs) {
                  setEmail(false)
                  setCallUs(false)
                  setLocation(false)
                }
              }}
            >
              Contact us
            </button>
            <button
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out"
              onClick={() => {
                navigation('/careers')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Careers
            </button>
            <button
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out"
              onClick={() => {
                navigation('/privacy')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Privacy
            </button>
            <button
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out"
              onClick={() => {
                navigation('/terms')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Terms of Service
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              className="flex items-center space-x-2 text-white hover:text-teal-300 transition duration-300 ease-in-out"
              onClick={displayEmail}
            >
              <HiOutlineMail className="text-2xl" />
              <span>Email Us</span>
            </button>
            <button
              className="flex items-center space-x-2 text-white hover:text-teal-300 transition duration-300 ease-in-out"
              onClick={displayLocation}
            >
              <HiOutlineLocationMarker className="text-2xl" />
              <span>Our Location</span>
            </button>
            <button
              className="flex items-center space-x-2 text-white hover:text-teal-300 transition duration-300 ease-in-out"
              onClick={displayCallUs}
            >
              <HiOutlinePhone className="text-2xl" />
              <span>Call Us</span>
            </button>
          </div>
        </div>
      
      {email && (
        <div className="bg-teal-900 text-white text-center py-4">
          Email: shanzeement@business.com
        </div>
      )}
      {location && (
        <div className="bg-teal-900 text-white text-center py-4">
          Computer Engineering Building, Şaziment Havan Çalışma Salonu
        </div>
      )}
      {callUs && (
        <div className="bg-teal-900 text-white text-center py-4">
          Call Us: 0530 123 45 67
        </div>
      )}
      </div>
  )
}

export default Footer
