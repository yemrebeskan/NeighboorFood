import FoodCard from './FoodCard'

const FoodBasket = () => {
  const orderedFoods = [
    {
      id: 1,
      menuName: 'Shrimp with Meat',
      kcal: '230kcal',
      price: 20,
      carts: 15,
      likes: 9,
      disslikes: 3,
      image: 'https://via.placeholder.com/100',
      isTodaysMenu: true,
    },
    {
      id: 2,
      menuName: 'Spaghetti with Minced Meat',
      kcal: '320kcal',
      price: 12,
      carts: 22,
      likes: 15,
      disslikes: 4,
      image: 'https://via.placeholder.com/100',
      isTodaysMenu: false,
    },
    {
      id: 3,
      menuName: 'Creamy Penne with Mushrooms',
      kcal: '300kcal',
      price: 12,
      carts: 19,
      likes: 11,
      disslikes: 1,
      image: 'https://via.placeholder.com/100',
      isTodaysMenu: false,
    },
  ]

  let totalPrice = 0
  orderedFoods.forEach((food) => {
    totalPrice += food.price
  })

  return (
    <div className="absolute right-4 mt-16  bg-white shadow-lg rounded-md  text-green-800 w-80 scale-125 z-10 text-sm">
      <ul>
        {orderedFoods.map((food) => {
          return (
            <li className="mb-2 hover:bg-gray-100">
              <FoodCard food={food}></FoodCard>
            </li>
          )
        })}
      </ul>
      <div className="">
        <button className="h-12 w-24 border-2 rounded-md text-slate-200 bg-teal-500 hover:bg-teal-600">
          Give Order
        </button>
      </div>
    </div>
  )
}

export default FoodBasket
