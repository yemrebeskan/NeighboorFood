import axios from 'axios'
import React, { useEffect, useState } from 'react'
import faviconImage from './photo4.png'

const MenuConfirmation = () => {
  //const [orders, setOrders] = useState([])

  const orders = [
    {
      id: 1,
      mealName: 'Pizza',
      mealId: 'pza123',
      mealPhoto: faviconImage,
      quantity: 2,
      customer: {
        id: 1,
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
      },
    },
    {
      id: 2,
      mealName: 'Hamburger',
      mealId: 'hmb456',
      mealPhoto: faviconImage,
      quantity: 1,
      customer: {
        id: 2,
        firstName: 'Ayşe',
        lastName: 'Kara',
      },
    },
    {
      id: 3,
      mealName: 'Salata',
      mealId: 'slt789',
      mealPhoto: faviconImage,
      quantity: 3,
      customer: {
        id: 3,
        firstName: 'Mehmet',
        lastName: 'Demir',
      },
    },
  ]

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = localStorage.getItem('uid')
        const res = await axios.get(
          `http://127.0.0.1:3001/api/v1/orders/${uid}`
        )
        console.log(res.data.data.order)
        setOrders(res.data.data.order)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])*/

  const handleAccept = async (order) => {
    const updatedOrders = orders.filter((ord) => order.id !== ord.id)
    setOrders(updatedOrders)
    /*await axios.delete(
      `https://isces.onrender.com/api/v1/admin/orders/${order.id}`
    )*/
  }

  const handleReject = async (order) => {
    const updatedOrders = orders.filter((ord) => order.id !== ord.id)
    setOrders(updatedOrders)
    /*await axios.delete(
      `https://isces.onrender.com/api/v1/admin/orders/${order.id}`
    )*/
  }
  return (
    <div style={{ minHeight: '400px' }}>
      <h1 className="text-3xl font-bold flex justify-center mt-4 ">
        Menü Onayı
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
              width: '200px',
              height: '300px',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              margin: '0.5rem',
            }}
          >
            <img
              src={order.mealPhoto}
              alt="Order"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                {
                  //student.studentInfos.department.name || 'Menu'}
                  order.mealName
                }
              </p>
              <p style={{ margin: 0 }}>
                {
                  //student.studentInfos.name || 'İsim'}{' '}
                  order.customer.firstName + ' ' + order.customer.lastName
                }
              </p>
              <p style={{ margin: 0 }}>
                Adedi:
                {
                  //student.studentInfos.isCandidate || 'Adedi'}
                  order.quantity
                }
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
              onClick={() => handleAccept(student)}
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
              onClick={() => handleReject(student)}
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuConfirmation
