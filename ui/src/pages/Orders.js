import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrderedFoodContext from '../context/OrderedFoodContext';
import './Orders.css';

import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineLink } from "react-icons/ai";
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";


const OrderCart = ({ menu, ordersCtx }) => {
  const ctxOrder = useContext(OrderedFoodContext);
  return (
    <div className='border-4 border-[#134e4a] rounded-2xl w-full p-3 grid grid-cols-4 items-center my-2'>
      <div className='col-span-2 flex justify-start items-center'>
        <img src={menu.img} className='w-[100px] h-[100px] rounded-xl mr-5' />
      
        <div>
          <h2 className='font-bold text-2xl italic'>{menu.name}</h2>
          <p className='text-black/60 font-light text-sm'>{menu.kcal} kcal</p>
          <p className='italic underline cursor-pointer flex items-center hover:text-blue-700'><AiOutlineLink className='mr-1' size={14} /> from {menu.chef}</p>
        </div>
      </div>
      
      <div className='flex justify-around items-center px-12'>
        <BsFillArrowDownCircleFill onClick={() => ctxOrder.decreaseCountOfFood(menu._id)} size={24} color='#219b4e' className='cursor-pointer' />
        <p>{menu.count}</p>
        <BsFillArrowUpCircleFill onClick={() => ctxOrder.incrementCountOfFood(menu._id)} size={24} color='#219b4e' className='cursor-pointer' />
      </div>

      <p className='font-bold italic text-end text-3xl mr-16'>${menu.price * menu.count}</p>
    </div>
  )
}


const Orders = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEmpty, setIsEmty] = useState(false);
  const ordersCtx = useContext(OrderedFoodContext);
  const orders = ordersCtx.giveOrderHandler();

  useEffect(() => {
    if (ordersCtx.orderedFoods.length == 0) {
      setIsEmty(true);
    }
    else {
      setIsEmty(false);
    }
  }, [ordersCtx, setIsEmty, isEmpty])

  const closeSelectedOrder = () => {
    setSelectedOrder(null);
  }

  // useEffect(() => {
  //   if (!authCtx.isLoggedIn) {
  //     navigate('/');
  //   }
  // }, [authCtx.isLoggedIn, navigate]);

  return (
    <div className="mb-64">
      {
        isEmpty ? (
          <div className='w-screen h-full flex flex-col justify-center items-center text-center'>
            <p className='text-2xl text-black/70'>You do not have any orders yet...</p>
            <div className='w-full container max-w-xs m-auto mt-16'>
              <button onClick={() => navigate("/")} className='bg-blue-600 py-2 px-6 rounded-md text-white w-full flex justify-between'><AiOutlineArrowLeft className='mt-[4.5px]' /> Go Home</button>
              <button onClick={() => navigate("/pastorders")} className='bg-[#134e4a] mt-3 py-2 px-6 rounded-md text-white w-full flex justify-between'>Review Your Past Orders <AiOutlineArrowRight className='mt-[4.5px]' /></button>
            </div>
          </div>
        ) : (
          <div className='mt-12 container max-w-7xl m-auto'>
            
            <div className='flex justify-between items-center'>
              <p className='text-3xl font-bold'>Total Price: ${ordersCtx.calculateTotalPrice()}</p>
              <button className='my-3 py-4 px-6 bg-[#219b4e] rounded-lg text-white font-bold'>Complete Order</button>
            </div>


            <h1 className='text-xl font-bold mt-12'>Your Orders:</h1>
            {
              ordersCtx.orderedFoods.reverse().map((food, index) => (
                <div>
                  <OrderCart menu={food} ordersCtx={ordersCtx} key={index} />
                </div>
              ))
            }

            <button onClick={() => navigate("/pastorders")} className='bg-[#134e4a] mt-20 py-2 px-6 rounded-md text-white'>Review Your Past Orders</button>
          </div>
        )
      }

    </div>
  )
}

export default Orders
