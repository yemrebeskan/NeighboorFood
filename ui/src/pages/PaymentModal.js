import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentModal = ({ isOpen, onClose, totalAmount, orderId }) => {
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  const validate = () => {
    let tempErrors = []

    if (phone.trim() === '') tempErrors.push('Phone number is required.')
    if (address.trim() === '') tempErrors.push('Delivery address is required.')

    setErrors(tempErrors)

    return tempErrors.length === 0
  }

  const handleSubmit = async () => {
    const res = await axios.put(
      `https://neighboorfood-s5im.onrender.com/api/v1/orders/order/${orderId}/completed`
    )
    if (res.data.status === 'success') {
      onClose()
      navigate('/orders')
      window.location.reload()
    } else {
      // Error Modal
    }
    if (!validate()) return

    // Handle submit data here.
  }

  if (!isOpen) return null

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6">Payment Information</h1>
          <p>Your payment will be made at the door. Total: ${totalAmount}</p>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Delivery Address:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-6">
            {errors.map((error, index) => (
              <p key={index} className="text-red-500 text-xs italic">
                {error}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Confirm
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
