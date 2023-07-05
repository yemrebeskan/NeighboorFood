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
  const [isUnfavoriteLoading, setIsUnfavoriteLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // For now, I use localStorage
    const uid = localStorage.getItem('uid')
    setIsLoading(true)
    axios
      .get(`https://neighboorfood-s5im.onrender.com/api/v1/favourites/${uid}`)
      .then((result) => {
        setFavoriteChefs(result.data.data.favouriteChefs)
      })
      .finally(() => setIsLoading(false))
  }, [favCtx.favoriteChefs])

  const handleChefDelete = async (userId) => {
    setIsUnfavoriteLoading(true)
    const child = favoriteChefs.find((chef) => chef.id == userId)

    const uid = localStorage.getItem('uid')

    try {
      const res = await axios.delete(
        `https://neighboorfood-s5im.onrender.com/api/v1/favourites/${uid}/${child.chefId}`
      )

      if (res.data.status === 'success') {
        favCtx.removeChefFromFavorites(child._id)
      }
    } catch (error) {
      setError('Error deleting chef from favorites. Please try again later.')
    } finally {
      setIsUnfavoriteLoading(false)
    }
    // CALL API
  }

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate('/')
    }
  }, [authCtx.isLoggedIn, navigate])

  return (
    <div className="flex flex-col items-center">
      {isLoading && (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 mb-12 border-green-500"></div>
      )}
      {isUnfavoriteLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 mb-12 border-green-500"></div>
        </div>
      )}
      {!isLoading && favoriteChefs.length === 0 ? (
        <div className="p-10 m-6 rounded-xl text-center h-80">
          <p className="text-3xl text-gray-600">
            You don't have any favorite chefs.
          </p>
        </div>
      ) : (
        <div className="p-8 mt-12 grid grid-cols-2 auto-rows-auto gap-12 w-screen">
          {favoriteChefs.map((chef, index) => (
            <ChefCard
              name={chef.name}
              image={chef.image}
              rating={chef.rating}
              key={index}
              id={chef.id} //We should use chef's userId instead chefId to redirect our users to chef pages
              onDelete={handleChefDelete}
            />
          ))}
        </div>
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
