// footer.js:

import "./footerclass.css";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";  // Importing icons from react-icons library

const Footer = () => {
  return (
    <div className="footerclass bg-teal-900 flex flex-col items-center justify-center text-slate-200 p-4 space-y-6">
      <div className="text-center">
        <p className="text-2xl font-semibold mb-2">© 2023 NeighborFood</p>
        <p className="text-sm">We deliver quality and healthy food to your doorstep.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out">Who we are</button>
        <button className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out">Contact us</button>
        <button className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out">Careers</button>
        <button className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out">Privacy</button>
        <button className="px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded text-white transition duration-300 ease-in-out">Terms of Service</button>
      </div>
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 text-white hover:text-teal-300 transition duration-300 ease-in-out">
          <HiOutlineMail className="text-2xl"/> 
          <span>Email Us</span>
        </button>
        <button className="flex items-center space-x-2 text-white hover:text-teal-300 transition duration-300 ease-in-out">
          <HiOutlineLocationMarker className="text-2xl"/> 
          <span>Our Location</span>
        </button>
        <button className="flex items-center space-x-2 text-white hover:text-teal-300 transition duration-300 ease-in-out">
          <HiOutlinePhone className="text-2xl"/> 
          <span>Call Us</span>
        </button>
      </div>
    </div>
  )
}

export default Footer
