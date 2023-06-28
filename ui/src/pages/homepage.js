import Foods from '../components/homepageComponents/foods'
import SearchBar from '../components/homepageComponents/SearchBar'
import img from './photo4.png'
import CardItem from '../components/homepageComponents/CardItem'
import AuthContext from '../context/AuthContext'
import React, { useContext, useState } from 'react'
import LocationSearchResults from '../components/homepageComponents/LocationSearchResults.js'
import axios from 'axios'

const HomePage = () => {
  const authCtx = useContext(AuthContext)
  const [searchResults, setSearchResults] = useState({ menus: [], chefs: [] })
  const [isSearched, setIsSearched] = useState(false)


  const handleSearch = async (location) => {

    console.log(location)
    const chefsRes = await axios.get(
      `http://127.0.0.1:3001/api/v1/chefs/location/${location}`
    )
    console.log(chefsRes)
    if (chefsRes.data.status !== 'success') {
      //ERROR HANDLING
    }
    const chefs = chefsRes.data.data
    const menus = []
    chefs.map((chef) => {
      chef.chefFoods.map((chefFood) => {
        chefFood.image = 'https://via.placeholder.com/150'
        menus.push(chefFood)
        return chefFood
      })
    })
    chefs.map((chef) => {
      chef.image = 'https://via.placeholder.com/150'
      return chef
    })
    setIsSearched(true)
    setSearchResults({ menus, chefs })
  }

  return (
    <div className={authCtx.isOnClickedSignButton ? 'blur' : ''}>
      <div className="py-10 md:py-36 flex flex-col md:flex-row">
        <div className="mx-auto md:ml-32 md:-mt-20">
          <SearchBar onSearch={handleSearch} />
        </div>
        <img src={img} className="mx-auto md:-mt-56 md:ml-6 rounded-lg"></img>
      </div>
      {isSearched && (
        <div>
          <LocationSearchResults
            menus={searchResults.menus}
            chefs={searchResults.chefs}
          />
        </div>
      )}

      <div className="bg-teal-500 flex justify-center">
        <div className="mx-auto">
          <Foods />
        </div>
        <div className="hidden md:block bg-orange-100 rounded-full px-36 py-36 absolute mt-48"></div>
      </div>
      <div className="py-10 md:py-44 bg-orange-100 flex flex-col md:flex-row">
        <div className="mx-auto md:ml-32">
          <CardItem />
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
