import Foods from '../components/homepageComponents/foods'
import SearchBar from '../components/homepageComponents/SearchBar'
import img from './photo4.png'
import CardItem from '../components/homepageComponents/CardItem'
import AuthContext from '../context/AuthContext'
import React, { useContext, useState } from 'react'
import LocationSearchResults from '../components/homepageComponents/LocationSearchResults.js';


const HomePage = () => {
  const authCtx = useContext(AuthContext)
  const [searchResults, setSearchResults] = useState({ menus: [], chefs: [] });

  const handleSearch = (location) => {
    // Here you should fetch the menus and chefs based on the location
    // TODO: this is some dummy data
    const menus = [
      { id: 1, menuName: 'Menu 1', description: 'Description 1', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
      { id: 2, menuName: 'Menu 2', description: 'Description 2', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
      { id: 1, menuName: 'Menu 1', description: 'Description 1', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
      { id: 2, menuName: 'Menu 2', description: 'Description 2', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
      { id: 1, menuName: 'Menu 1', description: 'Description 1', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
      { id: 2, menuName: 'Menu 2', description: 'Description 2', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
      { id: 1, menuName: 'Menu 1', description: 'Description 1', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
      { id: 2, menuName: 'Menu 2', description: 'Description 2', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
      { id: 1, menuName: 'Menu 1', description: 'Description 1', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
      { id: 2, menuName: 'Menu 2', description: 'Description 2', price: 20, kcal:230 ,image: 'https://via.placeholder.com/150' },
    ];
    const chefs = [
      { id: 1, name: 'Chef 1', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Chef 2', image: 'https://via.placeholder.com/150' },
      { id: 13, name: 'Chef 1', image: 'https://via.placeholder.com/150' },
      { id: 22, name: 'Chef 2', image: 'https://via.placeholder.com/150' },
      { id: 17, name: 'Chef 1', image: 'https://via.placeholder.com/150' },
      { id: 23, name: 'Chef 2', image: 'https://via.placeholder.com/150' },
      { id: 16, name: 'Chef 1', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Chef 2', image: 'https://via.placeholder.com/150' },
      { id: 1, name: 'Chef 1', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Chef 2', image: 'https://via.placeholder.com/150' },
      { id: 1, name: 'Chef 1', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Chef 2', image: 'https://via.placeholder.com/150' },
      { id: 1, name: 'Chef 1', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Chef 2', image: 'https://via.placeholder.com/150' },
      { id: 1, name: 'Chef 1', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Chef 2', image: 'https://via.placeholder.com/150' },
    ];
    setSearchResults({ menus, chefs });
  };

  return (
    <div className={authCtx.isOnClickedSignButton ? 'blur' : ''}>
      <div className="py-10 md:py-36 flex flex-col md:flex-row">
        <div className="mx-auto md:ml-32 md:-mt-20">
          <SearchBar onSearch={handleSearch} />
        </div>
        <img src={img} className="mx-auto md:-mt-32 md:ml-64 rounded-lg"></img>
        </div>
      <div>
        <LocationSearchResults menus={searchResults.menus} chefs={searchResults.chefs} />
      </div>

      <div className="bg-teal-500 flex justify-center">
        <div className="mx-auto">
          <Foods></Foods>
        </div>
        <div className="hidden md:block bg-orange-100 rounded-full px-36 py-36 absolute mt-48"></div>
      </div>
      <div className="py-10 md:py-44 bg-orange-100 flex flex-col md:flex-row">
        <div className="mx-auto md:ml-32">
          <CardItem></CardItem>
        </div>
        <div className="mx-auto md:ml-80">
          <h1 className="text-lg md:text-3xl italic text-teal-700 text-center md:text-left">
            KOMŞUDA PİŞER BİZE DE DÜŞER
          </h1>
        </div>
      </div>
    </div>
  )
}

export default HomePage