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
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://isces.onrender.com/api/v1/rep/");
        const representatives = res.data.data.representatives;
        const candidateRes = await axios.get(
          "https://isces.onrender.com/api/v1/admin/candidates"
        );
        const candidates = candidateRes.data.data.candidates;
        const allStudents = [...representatives, ...candidates];

        setStudents(allStudents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveAuthority = async (student) => {
    const updatedStudents = students.filter(
      (std) => student.studentInfos._id !== std.studentInfos._id
    );
    setStudents(updatedStudents);
    if (student.studentInfos.isRepresentative) {
      await axios.delete(
        `https://isces.onrender.com/api/v1/rep/cancelRep/${student.studentInfos._id}`
      );
    } else if (student.studentInfos.isCandidate) {
      await axios.delete(
        `https://isces.onrender.com/api/v1/candidate/${student.studentInfos._id}`
      );
    }
  };
*/
  const handleAccept = async (order) => {
    /*
        const updatedOrders = orders.filter((ord) => order.id !== ord.id)
        setOrders(updatedOrders)
        await axios.delete(`https://isces.onrender.com/api/v1/admin/orders/${order.id}`)
        */
  }

  const handleReject = async (order) => {
    /*
        const updatedOrders = orders.filter((ord) => order.id !== ord.id)
        setOrders(updatedOrders)
        await axios.delete(`https://isces.onrender.com/api/v1/admin/orders/${order.id}`)
        */
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
