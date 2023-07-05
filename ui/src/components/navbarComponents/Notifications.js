import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReviewModal from './ReviewModal'
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationIcon,
} from '@heroicons/react/solid'

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNewNotification, setHasNewNotification] = useState(true)
  const [notifications, setNotifications] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)

  // TODO: Backend!!
  const chef = { name: 'Chef Dummy' } // Dummy chef data
  const order = { details: 'Dummy order details' } // Dummy order data

  useEffect(() => {
    const fetchNotification = async () => {
      const uid = localStorage.getItem('uid')

      try {
        const response = await axios.get(
          `https://neighboorfood-s5im.onrender.com/api/v1/users/${uid}/notifications`
        )

        setNotifications(response.data.notifications)
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotification()
  }, [])

  const handleOpen = () => {
    setIsOpen(!isOpen)
    setHasNewNotification(false)
  }

  const handleNotificationClick = (notification) => {
    if (notification.message === 'Order is completed and delivered.') {
      setIsModalOpen(true)
    }
    deleteNotification(notification._id)
  }

  const deleteNotification = async (id) => {
    const uid = localStorage.getItem('uid')
    try {
      await axios.delete(
        `https://neighboorfood-s5im.onrender.com/api/v1/users/${id}/notification`
      )
      const response = await axios.get(
        `https://neighboorfood-s5im.onrender.com/api/v1/users/${uid}/notifications`
      )
      setNotifications(response.data.notifications)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button onClick={handleOpen} className="relative md:w-10 md:h-10 w-7 h-7">
        <BellIcon className="h-6 w-6 hover:text-green-700 hover:cursor-pointer hover:scale-150" />
        {hasNewNotification && (
          <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div className="px-4 py-3">
            <p className="text-sm leading-5 font-medium text-gray-900">
              Notifications
            </p>
          </div>
          <div className="py-1">
            {notifications.map((notification) => (
              <a
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                href="#"
                className={`flex items-center px-4 py-3 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  notification.isNew ? 'bg-yellow-50' : ''
                }`}
                role="menuitem"
              >
                {notification.isNew ? (
                  <ExclamationIcon
                    className="mr-3 h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                ) : (
                  <CheckCircleIcon
                    className="mr-3 h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                )}
                <span>{notification.message}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      <ReviewModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        chef={chef}
        order={order}
      />
    </div>
  )
}

export default Notifications
