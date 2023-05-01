import React, { useContext } from 'react'
import { AiOutlinePlus, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { FaShoppingBasket } from 'react-icons/fa'
import OrderedFoodContext from '../../context/OrderedFoodContext'

const Menu = ({ menu }) => {
  const foodCtx = useContext(OrderedFoodContext)
  const addBasketHandler = (menu) => {
    if (foodCtx.orderedFoods.some((item) => item.id === menu.id)) {
      foodCtx.incrementCountOfFood(menu.id)
    } else {
      foodCtx.addItemToOrders(menu)
    }
  }
  return (
    <div className="grid grid-cols-8 w-full py-8 my-4 mb-8 bg-white rounded-lg">
      <div className="col-span-2 flex justify-center items-center w-full h-full">
        {menu.isTodaysMenu ? (
          <div className="absolute -mt-44 text-3xl text-[#4f7472] font-bold font-dancing">
            Today's Menu
          </div>
        ) : null}
        <img
          className="w-[150px] h-[150px] rounded-full bg-cover"
          src={menu.image}
        />
      </div>

      <div className="col-span-4">
        <h2 className="font-bold text-2xl text-[#484743]">{menu.menuName}</h2>
        <p className="font-thin text-md">{menu.kcal}</p>
        <p className="font-extrabold text-3xl pt-8 text-[#484743]">
          ${menu.price}
        </p>
      </div>

      <div className="col-span-2 grid grid-rows-6">
        <div className="row-span-5 w-full h-full flex justify-center items-center">
          <button onClick={() => addBasketHandler(menu)}>
            <AiOutlinePlus
              className="bg-[#87bfb3] w-16 h-16 rounded-full cursor-pointer mr-2 mb-2 hover:mb-0 hover:mr-0 relative z-10"
              size={36}
              color="white"
            />
          </button>

          <div className="absolute w-16 h-16 rounded-full z-0 bg-[#537a72]"></div>
        </div>

        <div className="row-span-1 h-full w-full flex flex-row items-end">
          <div className="mr-4">
            <div className="absolute z-10 cursor-default w-4 h-4 flex justify-center items-center text-[#537a72] text-[12px] font-extrabold -mt-2 ml-4">
              {menu.carts}
            </div>
            <FaShoppingBasket
              size={24}
              color="#537a72"
              className="cursor-pointer relative z-0"
            />
          </div>

          <div className="mr-4">
            <div className="absolute z-10 cursor-default w-4 h-4 flex justify-center items-center text-[#537a72] text-[12px] font-extrabold -mt-2 ml-4">
              {menu.likes}
            </div>
            <AiFillLike
              size={24}
              color="#537a72"
              className="cursor-pointer relative z-0"
            />
          </div>

          <div>
            <div className="absolute z-10 cursor-default w-4 h-4 flex justify-center items-center text-[#537a72] text-[12px] font-extrabold -mt-2 ml-4">
              {menu.disslikes}
            </div>
            <AiFillDislike
              size={24}
              color="#537a72"
              className="cursor-pointer relative z-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const ChefMenus = ({ isChef }) => {
  // TODO: This should come from backend
  const mockMenus = [
    {
      id: 1,
      menuName: 'Shrimp with Meat',
      kcal: '230kcal',
      price: 20,
      carts: 15,
      likes: 9,
      disslikes: 3,
      image: 'https://via.placeholder.com/150',
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
      image: 'https://via.placeholder.com/150',
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
      image: 'https://via.placeholder.com/150',
      isTodaysMenu: false,
    },
  ]

  return (
    <div className="w-full">
      {isChef && (
        <button className="mt-2 bg-green-700 text-white px-4 py-2 rounded-md">
          Edit Menus
        </button>
      )}
      {mockMenus.map((menu) => (
        <Menu menu={menu} />
      ))}
    </div>
  )
}

export default ChefMenus
