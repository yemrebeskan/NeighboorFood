import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Orders.css'
import PaymentModal from './PaymentModal'

import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineLink,
} from 'react-icons/ai'
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs'
import axios from 'axios'

const OrderCart = ({ menu, ordersCtx, chef }) => {
  const navigate = useNavigate()
  return (
    <div className="border-4 border-[#134e4a] rounded-2xl w-full p-3 grid grid-cols-4 items-center my-2">
      <div className="col-span-2 flex justify-start items-center">
        <img src={menu.image} className="w-[100px] h-[100px] rounded-xl mr-5" />

        <div>
          <h2 className="font-bold text-2xl italic">{menu.orderedFood.name}</h2>
          <p className="text-black/60 font-light text-sm">
            {menu.orderedFood.kcal} kcal
          </p>
          <p  onClick={() => navigate(`/chef/${chef._id}`)} className="italic underline cursor-pointer flex items-center hover:text-blue-700">
          <AiOutlineLink className="mr-1" size={14} /> from{' '}
            {chef.name} {chef.surname}
          </p>
        </div>
      </div>
      <div>{menu.quantity}</div>

      <p className="font-bold italic text-end text-3xl mr-16">
        ${menu.orderedFood.price * menu.quantity}
      </p>
    </div>
  )
}

const Orders = () => {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const [orderId, setOrderId] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isEmpty, setIsEmty] = useState(false)
  const [orders, setOrders] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [chef, setChef] = useState({})

  const closeSelectedOrder = () => {
    setSelectedOrder(null)
  }
  const calculateTotalPrice = (orderList) => {
    let total = 0
    orderList.forEach((order) => {
      total += order.quantity * order.orderedFood.price
      setTotalPrice(total)
    })
  }

  const completeOrder = () => {
    setIsPaymentModalOpen(true)
  }

  useEffect(() => {
    const uid = localStorage.getItem('uid')
    axios
      .get(`http://127.0.0.1:3001/api/v1/orders/order/${uid}`)
      .then((result) => {
        if (result.data.data.activeOrder) {
          setOrderId(result.data.data.activeOrder._id)
          setChef(result.data.data.activeOrder.chef.userInfos)
        }
        console.log(result)
        
        const orderList = []
        if (result.data.data.activeOrder) {
          result.data.data.activeOrder.foods.map((order) => {
            orderList.push(order)
          })
        }

        if (orderList.length === 0) {
          setIsEmty(true)
        } else {
          setIsEmty(false)
        }
        calculateTotalPrice(orderList)
        setOrders(orderList)
      })
  }, [])

  return (
    <div className="mb-64">
      <div className={`${isPaymentModalOpen ? 'blur' : ''}`}>
        {isEmpty ? (
          <div className="w-screen h-full flex flex-col justify-center items-center text-center">
            <p className="text-2xl text-black/70">
              You do not have any orders yet...
            </p>
            <div className="w-full container max-w-xs m-auto mt-16">
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 py-2 px-6 rounded-md text-white w-full flex justify-between"
              >
                <AiOutlineArrowLeft className="mt-[4.5px]" /> Go Home
              </button>
              <button
                onClick={() => navigate('/pastorders')}
                className="bg-[#134e4a] mt-3 py-2 px-6 rounded-md text-white w-full flex justify-between"
              >
                Review Your Past Orders{' '}
                <AiOutlineArrowRight className="mt-[4.5px]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-12 container max-w-7xl m-auto">
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold">Total Price: ${totalPrice}</p>
              <button
                className="my-3 py-4 px-6 bg-[#219b4e] rounded-lg text-white font-bold"
                onClick={completeOrder}
              >
                Complete Order
              </button>
            </div>

            <h1 className="text-xl font-bold mt-12">Your Orders:</h1>
            {orders.reverse().map((food, index) => (
              <div>
                <OrderCart menu={food} key={index} chef={chef}/>
              </div>
            ))}

            <button
              onClick={() => navigate('/pastorders')}
              className="bg-[#134e4a] mt-20 py-2 px-6 rounded-md text-white"
            >
              Review Your Past Orders
            </button>
          </div>
        )}
      </div>

      <PaymentModal
        orderId={orderId}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={totalPrice}
      />
    </div>
  )
}

export default Orders
