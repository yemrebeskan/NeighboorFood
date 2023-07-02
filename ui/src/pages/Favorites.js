import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ChefCard from '../components/navbarComponents/ChefCard'
import FavoriteChefsContext from '../context/FavoriteChefsContex'
import axios from 'axios'
import ErrorModal from '../errorModal/errorModal'
const Favorites = () => {
  const favCtx = useContext(FavoriteChefsContext)

  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const [error, setError] = useState(null)
  const [favoriteChefs, setFavoriteChefs] = useState([])

  useEffect(() => {
    // For now, I use localStorage
    const uid = localStorage.getItem('uid')
    axios
      .get(`http://127.0.0.1:3001/api/v1/favourites/${uid}`)
      .then((result) => {
        setFavoriteChefs(result.data.data.favouriteChefs)
      })
  }, [favCtx.favoriteChefs])

  const handleChefDelete = async (chefId) => {
    const child = favoriteChefs.find((chef) => chef.chefId == chefId);
  
    const uid = localStorage.getItem('uid');
  
    try {
      const res = await axios.delete(
        `http://127.0.0.1:3001/api/v1/favourites/${uid}/${chefId}`
      );
  
      if (res.data.status === 'success') {
        favCtx.removeChefFromFavorites(child._id);
      }
    } catch (error) {
      setError('Error deleting chef from favorites. Please try again later.');
    }
    // CALL API
  };
  

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate('/')
    }
  }, [authCtx.isLoggedIn, navigate])

  return (
    <div className="grid">
    {favoriteChefs.length === 0 ? (
      <div className="p-10 m-6 rounded-xl text-center h-80">
      <p className="text-3xl text-gray-600">You don't have any favorite chefs.</p>
    </div>
    
    ) : (
      favoriteChefs.map((chef, index) => (
        <ChefCard
          name={chef.name}
          image={chef.image}
          rating={chef.rating}
          key={index}
          id={chef.chefId}
          onDelete={handleChefDelete}
        />
      ))
    )}
    {error && (
        <ErrorModal
          isOpen={error !== null}
          errorMessage={error}
          onClose={() => setError(null)}
        />
      )}
  </div>
  )
}

export default Favorites
