import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AuthContext from './AuthContext'
// Temp Data
const initialChefsData = [
  {
    id: 11,
    name: 'Chef 1',
    image:
      'https://www.themanual.com/wp-content/uploads/sites/9/2022/03/chef-tobais-dorzon.jpg?resize=1200%2C630&p=1',
    rating: 4.5,
  },
  {
    id: 12,
    name: 'Chef 2',
    image:
      'https://www.themanual.com/wp-content/uploads/sites/9/2022/03/chef-tobais-dorzon.jpg?resize=1200%2C630&p=1',
    rating: 3,
  },
  {
    id: 13,
    name: 'Chef 3',
    image:
      'https://www.themanual.com/wp-content/uploads/sites/9/2022/03/chef-tobais-dorzon.jpg?resize=1200%2C630&p=1',
    rating: 5,
  },
]

const FavoriteChefsContext = React.createContext({
  favoriteChefs: [],
  addChefToFavorites: (newItem) => {},
  removeChefFromFavorites: (removedItem) => {},
  deleteFavorites: () => {},
})

export const FavoriteChefsContextProvider = (props) => {
  const [favoriteChefs, setFavoriteChefs] = useState(initialChefsData)

  const addChefToFavorites = (newItem) => {
    newItem.count = 1
    setFavoriteChefs((prevState) => {
      return [...prevState, newItem]
    })
  }

  const removeChefFromFavorites = (removedItemId) => {
    setFavoriteChefs((prevState) =>
      prevState.filter((item) => item.id != removedItemId)
    )
  }

  const deleteChefs = () => {
    setFavoriteChefs([])
  }
  useEffect(() => {});

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
