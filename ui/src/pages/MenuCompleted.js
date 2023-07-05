import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ErrorModal from '../errorModal/errorModal';

const MenuCompleted = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true); // New state variable

  const fetchData = async () => {
    try {
      const uid = localStorage.getItem('uid');
      const res = await axios.get(
        `http://127.0.0.1:3001/api/v1/orders/${uid}/accepted`
      );
      setOrders(res.data.data.order);
      setIsLoading(false); // Set loading state to false after fetching is done
    } catch (error) {
      setError('Error fetching menus. Please try again later.');
      setIsLoading(false); // Set loading state to false in case of error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCompleted = async (order) => {
    const res = await axios.put(
      `http://127.0.0.1:3001/api/v1/orders/order/${order._id}/complete`
    );
    if (res.data.status === 'success') {
      const updatedOrders = orders.filter((m) => order.id !== m.id);
      setOrders(updatedOrders);
    } else {
      setError('Error completing the order. Please try again later.');
    }
  };

  return (
    <div style={{ minHeight: '400px', position: 'relative' }}>
      {isLoading ? (
        <div className="absolute flex items-center justify-center inset-1/4">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>      
      ):
        (
        <>
          <h1 className="text-3xl font-bold flex justify-center mt-4">
            Menu Completed
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
            {orders.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '18px' }}>
                There are no menus.
              </p>
            ) : (
              orders.map((order, index) => (
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
                    onClick={() => handleCompleted(order)}
                  >
                    Complete
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {error && (
        <ErrorModal
          isOpen={error !== null}
          errorMessage={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
};

export default MenuCompleted;
