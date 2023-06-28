import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ChefCard from '../components/navbarComponents/ChefCard'
import FavoriteChefsContext from '../context/FavoriteChefsContex'
import axios from 'axios'

const Favorites = () => {
  const favCtx = useContext(FavoriteChefsContext)

  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

  const [favoriteChefs, setFavoriteChefs] = useState([])

  useEffect(() => {
    // For now, I use localStorage
    const uid = localStorage.getItem('uid')
    axios
      .get(`http://127.0.0.1:3001/api/v1/favourites/${uid}`)
      .then((result) => {
        setFavoriteChefs(result.data.data.favouriteChefs)
      })
  }, [])

  const handleChefDelete = (chefId) => {
    const child = favoriteChefs.find((chef) => chef.id == chefId)
    favCtx.removeChefFromFavorites(child.id)
    // CALL API
  }

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate('/')
    }
  }, [authCtx.isLoggedIn, navigate])

  return (
    <div className="grid">
      {favoriteChefs.map((chef, index) => (
        <ChefCard
          name={chef.name}
          image={chef.image}
          rating={chef.rating}
          key={index}
          id={chef.id}
          onDelete={handleChefDelete}
        />
      ))}
    </div>
  )
}

export default Favorites
