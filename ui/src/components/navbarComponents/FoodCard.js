import { useState } from 'react'
import {
  AiOutlinePlus,
  AiFillLike,
  AiFillDislike,
  AiOutlineMinus,
} from 'react-icons/ai'

const FoodCard = ({ food }) => {
  const [countOfFood, setCountOfFood] = useState(1)
  console.log(countOfFood)

  const incrementCount = () => {
    if (countOfFood >= 0) {
      setCountOfFood((prevState) => prevState + 1)
    }
  }

  const decreaseCount = () => {
    if (countOfFood >= 1) {
      setCountOfFood((prevState) => prevState - 1)
    }
  }
  return (
    <div className="flex w-84 h-32 border-2 border-[#537a72]">
      <img
        className="w-[50px] h-[50px] rounded-full bg-cover mt-6 ml-2"
        src={food.image}
      ></img>
      <div className="mt-6 ml-4 justify-self-center ">{food.menuName}</div>
      <div className="mt-12 ml-8 justify-self-end">{food.price}$</div>
      <div className="row-span-5 w-full h-full flex justify-center items-center">
        <AiOutlineMinus
          className="bg-[#87bfb3] w-6 h-6 rounded-full cursor-pointer mr-4 mb-2 hover:mb-0  relative z-10"
          size={12}
          color="white"
          onClick={decreaseCount}
        />
        <div className="absolute w-4 h-4 rounded-full z-0 mr-12 bg-[#537a72]"></div>
        <AiOutlinePlus
          onClick={incrementCount}
          className="bg-[#87bfb3] w-6 h-6 rounded-full cursor-pointer mr-2 mb-2 hover:mb-0  relative z-10"
          size={12}
          color="white"
        />
        <div className="absolute w-4 h-4 ml-8 rounded-full z-0 bg-[#537a72]"></div>
        <p className="ml-2">{countOfFood}</p>
      </div>
    </div>
  )
}

export default FoodCard
/* */
