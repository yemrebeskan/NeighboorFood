import { useContext } from 'react'
import OrderedFoodContext from '../../context/OrderedFoodContext'
import FoodCard from './FoodCard'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FoodBasket = () => {
  const foodCtx = useContext(OrderedFoodContext)
  const uid = localStorage.getItem('uid')
  const navigate = useNavigate()

  const giveOrder = async () => {
    const orderedFoodIds = foodCtx.orderedFoods.map((food) => {
      return { foodId: food.foodId._id, quantity: food.count }
    })
    console.log(orderedFoodIds)
    const res = await axios.post(
      `http://127.0.0.1:3001/api/v1/orders/createOrder/${uid}`,
      {
        orderedFoods: orderedFoodIds,
        chef: foodCtx.orderedFoods[0].foodId.chef,
      }
    )
    if (res.data.status === 'success') {
      navigate('/orders')
      window.location.reload();
      
    }
  }

  return (
    <div className="absolute right-4 mt-16  bg-white shadow-lg rounded-md  text-green-800 w-80 scale-125 z-10 text-sm">
      {foodCtx.orderedFoods.length === 0 && (
        <div>Your shopping cart is empty.</div>
      )}
      <ul>
        {foodCtx.orderedFoods.map((food) => {
          return (
            <li className="mb-2 hover:bg-gray-100">
              <FoodCard food={food}></FoodCard>
            </li>
          )
        })}
      </ul>
      {foodCtx.orderedFoods.length > 0 && (
        <div className="">
          <div className="flex">
            <div className="ml-4">Total Price:</div>
            <div className="mb-4 ml-48">{foodCtx.totalPrice}$</div>
          </div>

          <button
            onClick={giveOrder}
            className="h-12 w-24 border-2 rounded-md text-slate-200 bg-teal-500 hover:bg-teal-600" /*onClick={()=>foodCtx.deleteOrders()}*/
          >
            Give Order
          </button>
        </div>
      )}
    </div>
  )
}

export default FoodBasket
