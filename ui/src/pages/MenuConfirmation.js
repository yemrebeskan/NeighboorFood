import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ErrorModal from '../errorModal/errorModal'

const MenuConfirmation = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    try {
      const uid = localStorage.getItem('uid')
      const res = await axios.get(
        `https://neighboorfood-s5im.onrender.com/api/v1/orders/${uid}`
      )
      setOrders(res.data.data.order), setIsLoading(false)
    } catch (error) {
      setError('Error fetching pending orders. Please try again later.')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAccept = async (order) => {
    const res = await axios.put(
      `https://neighboorfood-s5im.onrender.com/api/v1/orders/order/${order._id}/accept`
    )
    if (res.data.status === 'success') {
      const updatedOrders = orders.filter((o) => order.id !== o.id)
      setOrders(updatedOrders)
    } else {
      setError('Error accepting order, Please try again later.')
    }
  }

  const handleReject = async (order) => {
    const res = await axios.put(
      `https://neighboorfood-s5im.onrender.com/api/v1/orders/order/${order._id}/reject`
    )
    if (res.data.status === 'success') {
      const updatedOrders = orders.filter((o) => order.id !== o.id)
      setOrders(updatedOrders)
    } else {
      setError('Error rejecting order, Please try again later.')
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="absolute flex items-center justify-center inset-1/4">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div style={{ minHeight: '400px' }}>
          <h1 className="text-3xl font-bold flex justify-center mt-4">
            Menu Confirmation
          </h1>
          <div
            style={{
              padding: '20px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              minHeight: '525px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {orders.map((order, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: '300px',
                  height: '600px',
                  padding: '1rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                  margin: '0.5rem',
                }}
              >
                {order.foods.map((food, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ margin: 0 }}>{food.orderedFood.name}</p>
                      <p style={{ margin: 0 }}>Quantity: {food.quantity}</p>
                    </div>
                  </div>
                ))}
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0 }}>
                    Customer: {order.user.name + ' ' + order.user.surname}
                  </p>
                  <p style={{ margin: 0 }}>
                    Phone Number: {order.user.phoneNumber}
                  </p>
                </div>

                <button
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleAccept(order)}
                >
                  Accept
                </button>
                <button
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleReject(order)}
                >
                  Reject
                </button>
              </div>
            ))}
          </div>
          {error && (
            <ErrorModal
              isOpen={error !== null}
              errorMessage={error}
              onClose={() => setError(null)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default MenuConfirmation
