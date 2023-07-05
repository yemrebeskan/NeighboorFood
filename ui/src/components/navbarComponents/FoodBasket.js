import { useContext, useState } from 'react'
import OrderedFoodContext from '../../context/OrderedFoodContext'
import FoodCard from './FoodCard'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorModal from '../../errorModal/errorModal'

const FoodBasket = () => {
  const foodCtx = useContext(OrderedFoodContext)
  const [error, setError] = useState(null)
  const uid = localStorage.getItem('uid')
  const navigate = useNavigate()

  const closeModal = () => {
    setError(null)
  }
  const giveOrder = async () => {
    const orderedFoodIds = foodCtx.orderedFoods.map((food) => {
      return { foodId: food._id, quantity: food.count }
    })

    const res = await axios.post(
      `https://neighboorfood-s5im.onrender.com/api/v1/orders/createOrder/${uid}`,
      {
        orderedFoods: orderedFoodIds,
        chefId: foodCtx.orderedFoods[0].chef,
      }
    )

    if (res.data.status === 'success') {
      navigate('/orders')
      window.location.reload()
    } else {
      setError('First you should confirm your active order.')
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
      <ErrorModal
        isOpen={error !== null}
        errorMessage={error}
        onClose={closeModal}
      />
    </div>
  )
}

export default FoodBasket
