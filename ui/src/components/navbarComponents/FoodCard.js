import axios from 'axios'
import { useCallback, useContext, useState } from 'react'
import {
  AiOutlinePlus,
  AiFillLike,
  AiFillDislike,
  AiOutlineMinus,
} from 'react-icons/ai'
import OrderedFoodContext from '../../context/OrderedFoodContext'

const FoodCard = ({ food }) => {
  const foodCtx = useContext(OrderedFoodContext)

  const incrementCount = async (id) => {
    const uid = localStorage.getItem('uid')
    const res = await axios.put('http://127.0.0.1:3001/api/v1/users/cart', {
      userId: uid,
      foodId: id,
    })
    if (res.data.status === 'success') {
      foodCtx.incrementCountOfFood(id)
    }
  }

  const decreaseCount = async (id) => {
    console.log(id)
    const uid = localStorage.getItem('uid')
    const res = await axios.delete(
      `http://127.0.0.1:3001/api/v1/users/${uid}/cart/${id}`
    )
    console.log(res)
    if (res.data === '') {
      foodCtx.decreaseCountOfFood(id)
    }
  }
  return (
    <div className="flex w-84 h-32 border-2 border-[#537a72]">
      <img
        className="w-[50px] h-[50px] rounded-full bg-cover mt-6 ml-2"
        src={food.image}
      ></img>
      <div className="mt-6 ml-4 justify-self-center ">{food.name}</div>
      <div className="mt-12 ml-8 justify-self-end">{food.price}$</div>
      <div className="row-span-5 w-full h-full flex justify-center items-center">
        <AiOutlineMinus
          className="bg-[#87bfb3] w-6 h-6 rounded-full cursor-pointer mr-4 mb-2 hover:mb-0  relative z-10"
          size={12}
          color="white"
          onClick={() => decreaseCount(food.foodId._id)}
        />
        <div className="absolute w-4 h-4 rounded-full z-0 mr-12 bg-[#537a72]"></div>
        <AiOutlinePlus
          onClick={() => incrementCount(food.foodId._id)}
          className="bg-[#87bfb3] w-6 h-6 rounded-full cursor-pointer mr-2 mb-2 hover:mb-0  relative z-10"
          size={12}
          color="white"
        />
        <div className="absolute w-4 h-4 ml-8 rounded-full z-0 bg-[#537a72]"></div>
        <p className="ml-2">{food.count}</p>
      </div>
    </div>
  )
}

export default FoodCard
/* */
