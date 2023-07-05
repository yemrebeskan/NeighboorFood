import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AuthContext from './AuthContext'

const FavoriteChefsContext = React.createContext({
  favoriteChefs: [],
  addChefToFavorites: (newItem) => {},
  removeChefFromFavorites: (removedItem) => {},
  deleteFavorites: () => {},
})

export const FavoriteChefsContextProvider = (props) => {
  const authCtx = useContext(AuthContext)
  const [favoriteChefs, setFavoriteChefs] = useState([])

  const addChefToFavorites = (newItem) => {
    newItem.count = 1
    setFavoriteChefs((prevState) => {
      return [...prevState, newItem]
    })
  }

  const removeChefFromFavorites = (removedItemId) => {
    setFavoriteChefs((prevState) =>
      prevState.filter((item) => item._id !== removedItemId)
    )
  }

  const deleteChefs = () => {
    setFavoriteChefs([])
  }

  useEffect(() => {
    const fetchFavoriteChefs = async () => {
      try {
        const uid = localStorage.getItem('uid')
        const response = await axios.get(
          `https://neighboorfood-s5im.onrender.com/api/v1/favourites/${uid}`
        )
        setFavoriteChefs(response.data.data.favouriteChefs)
      } catch (error) {
        console.log('Error fetching favorite chefs:', error)
      }
    }

    if (authCtx.isLoggedIn) {
      fetchFavoriteChefs()
    }
  }, [authCtx.isLoggedIn])

  return (
    <FavoriteChefsContext.Provider
      value={{
        deleteChefs: deleteChefs,
        favoriteChefs: favoriteChefs,
        addChefToFavorites: addChefToFavorites,
        removeChefFromFavorites: removeChefFromFavorites,
      }}
    >
      {props.children}
    </FavoriteChefsContext.Provider>
  )
}

export default FavoriteChefsContext
