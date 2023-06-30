import Foods from '../components/homepageComponents/foods';
import SearchBar from '../components/homepageComponents/SearchBar';
import img from './photo4.png';
import CardItem from '../components/homepageComponents/CardItem';
import AuthContext from '../context/AuthContext';
import React, { useContext, useState } from 'react';
import LocationSearchResults from '../components/homepageComponents/LocationSearchResults.js';
import axios from 'axios';

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState({ menus: [], chefs: [] });
  const [isSearched, setIsSearched] = useState(false);


  const handleSearch = async (location) => {

    console.log(location);
    const chefsRes = await axios.get(
      `http://127.0.0.1:3001/api/v1/chefs/location/${location}`
    );
    console.log(chefsRes);
    if (chefsRes.data.status !== 'success') {
      //ERROR HANDLING
    }
    const chefs = chefsRes.data.data;
    const menus = [];
    chefs.map((chef) => {
      chef.chefFoods.map((chefFood) => {
        chefFood.image = 'https://via.placeholder.com/150';
        menus.push(chefFood);
        return chefFood;
      })
    })
    chefs.map((chef) => {
      chef.image = 'https://via.placeholder.com/150';
      return chef;
    })
    setIsSearched(true);
    setSearchResults({ menus, chefs });
  }

  return (
    <div className={authCtx.isOnClickedSignButton ? 'blur' : ''}>
      <div className="container max-w-[90rem] mx-auto py-6 px-4 flex xl:justify-between justify-center items-center flex-col xl:flex-row">
        <div className="w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
        <img src={img} className="mx-auto rounded-lg xl:my-0 my-6" />
      </div>
      {isSearched && (
        <div className='container max-w-[90rem] mx-auto px-2'>
          <LocationSearchResults
            menus={searchResults.menus}
            chefs={searchResults.chefs}
          />
        </div>
      )}

      <div className="bg-teal-500 flex justify-center w-full">
        <div className="mx-auto w-full">
          <Foods />
        </div>
        <div className="block bg-orange-100 rounded-full absolute xl:mt-48 lg:mt-44 md:mt-32 sm:mt-24 mt-16 z-10 xl:px-36 xl:py-36 lg:px-28 lg:py-28 md:px-20 md:py-20 sm:px-16 sm:py-16 px-12 py-12" />
      </div>

      
      <div className='bg-orange-100 sm:py-24 py-16'>
        <div className="container max-w-[90rem] mx-auto py-10 flex flex-col xl:flex-row items-center justify-center relative z-20">
          <div className="mx-auto">
            <CardItem />
          </div>
          <div className="mx-auto">
            <h1 className="text-lg md:text-3xl italic text-teal-700 text-center md:text-left mt-12 xl:mt-0">
              KOMŞUDA PİŞER BİZE DE DÜŞER
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
