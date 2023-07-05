import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import ErrorModal from '../errorModal/errorModal'
const OrderCart = ({ order, date, state }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menu = order.foods
  let name = ''
  let total = 0
  menu.forEach((m) => {
    name += m.orderedFood.name
    name += ', '
    total += m.orderedFood.price
  })

  return (
    <div className="container max-w-7xl m-auto my-10">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`grid grid-cols-10 mt-5 py-5 px-5 ${
          isOpen ? 'rounded-t-md' : 'rounded-md'
        } text-sm text-white cursor-pointer ${
          state == 'completed'
            ? 'bg-[#104eb1]'
            : state == 'accepted'
            ? 'bg-[#0d914f]'
            : state == 'rejected'
            ? 'bg-[#9a0e34]'
            : state == 'pending'
            ? 'bg-[#f06087]'
            : 'bg-black'
        }`}
      >
        <h1 className="col-span-6">{name}</h1>
        <p className=" col-span-2">{date.toString().slice(0, 15)}</p>

        <p className="font-light mr-10 col-span-1">{state}</p>

        <div className="flex justify-end">
          {isOpen ? (
            <BsFillArrowUpCircleFill color="yellow" size={24} />
          ) : (
            <BsArrowDownCircleFill size={24} />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className={`py-5 px-7 ${
            state == 'completed'
              ? 'bg-[#467cd2]'
              : state == 'accepted'
              ? 'bg-[#44c886]'
              : state == 'rejected'
              ? 'bg-[#b64d69]'
              : state == 'pending'
              ? 'bg-[#f28ea8]'
              : 'bg-black'
          }`}
        >
          {menu.map((m) => (
            <div className="grid grid-cols-6 py-1 items-center">
              <p className="col-span-2">{m.orderedFood.name}</p>
              <p className="font-bold text-xl">x{m.quantity}</p>
              <p className="col-span-2 italic text-black/60">
                from{' '}
                {order.chef.userInfos.name + ' ' + order.chef.userInfos.surname}
              </p>
              <p className="text-end font-bold text-xl">
                ${m.orderedFood.price}
              </p>
            </div>
          ))}
          <div className="w-full border-2 border-black/60 mt-8" />
          <p className="mt-3">Total: ${total}</p>
        </div>
      )}
    </div>
  )
}

const PastOrders = () => {
  const [pastOrders, setPastOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    axios
      .get(`http://127.0.0.1:3001/api/v1/users/${uid}/pastorders`)
      .then((res) => {
        setPastOrders(res.data.orderHistory);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Couldn't fetch past orders");
      });
  }, []);

  return (
    <div style={{ minHeight: '400px', position: 'relative' }}>
      {isLoading ? (
        <div className="absolute flex items-center justify-center inset-1/4">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>      
      ):
        (
    <div>
      {pastOrders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-4">
          There are no past orders.
        </p>
      ) : (
        pastOrders.reverse().map((order, index) => (
          <OrderCart
            key={index}
            order={order}
            date={order.date}
            state={order.state}
          />
        ))
      )}
      {error && (
        <ErrorModal
          isOpen={error !== null}
          errorMessage={error}
          onClose={() => setError(null)}
        />
      )}
    </div>)}
    </div>
  );
};

export default PastOrders;
