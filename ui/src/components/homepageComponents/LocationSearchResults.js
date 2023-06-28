// LocationSearchResults.js
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MenuCard = ({ menu }) => {
  // This component will display individual menu
  // You can customize this as per your needs
  return (
    <div className="grid grid-cols-8 w-full py-8 my-4 mb-8 bg-white rounded-lg relative shrink-0">
      <div className="m-2 col-span-2 flex justify-center items-center w-full h-full relative">
        <div className="flex flex-col items-center justify-center">
          <Link to={`/chef/${menu.chefId}`}>
            <img
              className="w-[150px] h-[150px] rounded-full bg-cover"
              src={menu.image}
              alt={menu.name}
            />
          </Link>
        </div>
      </div>
      <div className="col-span-4">
        <div className="ml-6">
          <h2 className="font-bold text-2xl text-[#484743]">{menu.menuName}</h2>
          <p className="font-thin text-md">{menu.kcal}</p>
          <p className="font-extrabold text-3xl pt-8 text-[#484743]">
            ${menu.price}
          </p>
        </div>
      </div>
    </div>
  )
}

const ChefProfile = ({ chef }) => {
  const navigate = useNavigate()
  // This component will display individual chef profile
  // You can customize this as per your needs
  return (
    <div className="flex flex-col items-center shrink-0">
      <img
        className="w-32 h-32 object-cover rounded-full border-4 border-white"
        src={chef.image}
        alt={chef.name}
        onClick={() => {
          navigate(`/chef/${chef.id}`)
        }}
      />

      <h2>{chef.name}</h2>
    </div>
  )
}

const LocationSearchResults = ({ menus, chefs }) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row gap-8 overflow-x-scroll">
        {chefs.map((chef) => (
          <ChefProfile key={chef.id} chef={chef} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  )
}

export default LocationSearchResults
