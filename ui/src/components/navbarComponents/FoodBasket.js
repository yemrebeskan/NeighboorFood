import { useContext } from 'react'
import OrderedFoodContext from '../../context/OrderedFoodContext'
import FoodCard from './FoodCard'
import { Link } from 'react-router-dom'

const FoodBasket = () => {
  const foodCtx = useContext(OrderedFoodContext)
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
          <Link to="/orders">
            <button
              className="h-12 w-24 border-2 rounded-md text-slate-200 bg-teal-500 hover:bg-teal-600" /*onClick={()=>foodCtx.deleteOrders()}*/
            >
              Give Order
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default FoodBasket
