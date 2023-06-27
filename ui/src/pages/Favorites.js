import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ChefCard from '../components/navbarComponents/ChefCard'
import FavoriteChefsContext from '../context/FavoriteChefsContex'


const Favorites = () => {
  const favCtx = useContext(FavoriteChefsContext);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleChefDelete = (chefId) => {
    const child = favCtx.favoriteChefs.find((chef) => chef.id == chefId);
    favCtx.removeChefFromFavorites(child.id);
  }

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate('/')
    }
  }, [authCtx.isLoggedIn, navigate])

  return (
    <div className="grid">
      {favCtx.favoriteChefs.map((chef, index) => (
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
