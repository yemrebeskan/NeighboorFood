import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ErrorModal from '../errorModal/errorModal'

const MenuConfirmation = () => {
  const [menus, setMenus] = useState([])
  const [error, setError] = useState(null)
  const fetchData = async () => {
    try {
      const uid = localStorage.getItem('uid')
      const res = await axios.get(`http://127.0.0.1:3001/api/v1/orders/${uid}`)
      setMenus(res.data.data.order)
    } catch (error) {
      setError('Error fetching menus. Please try again later.')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAccept = async (menu) => {
    const updatedMenus = menus.filter((m) => menu.id !== m.id)
    setMenus(updatedMenus)
    /*await axios.delete(
      `https://isces.onrender.com/api/v1/admin/menus/${menu.id}`
    )*/
  }

  const handleReject = async (menu) => {
    const updatedMenus = menus.filter((m) => menu.id !== m.id)
    setMenus(updatedMenus)
    /*await axios.delete(
      `https://isces.onrender.com/api/v1/admin/menus/${menu.id}`
    )*/
  }

  return (
    <div style={{ minHeight: '400px' }}>
      <h1 className="text-3xl font-bold flex justify-center mt-4">
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
        {menus.map((menu, index) => (
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
            {menu.foods.map((food, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <img
                  src={food.orderedFood.image}
                  alt="Menu"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                ></img>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0 }}>{food.orderedFood.name}</p>
                  <p style={{ margin: 0 }}>Quantity: {food.quantity}</p>
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0 }}>
                Müşteri: {menu.user.name + ' ' + menu.user.surname}
              </p>
              <p style={{ margin: 0 }}>Phone Number: {menu.user.phoneNumber}</p>
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
              onClick={() => handleAccept(menu)}
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
              onClick={() => handleReject(menu)}
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
  )
}

export default MenuConfirmation
