import React, { useContext, useState } from 'react'
import StarRating from './StarRating'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import EditImage from './EditImage'
import FavoriteChefsContext from '../../context/FavoriteChefsContex'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// TODO: chef should come from backend
const ChefProfile = ({ isChef, chefInfo }) => {
  const chef = chefInfo

  const favCtx = useContext(FavoriteChefsContext)
  const { id } = useParams()
  const uid = localStorage.getItem('uid')

  const [isFavorited, setIsFavorited] = useState(
    favCtx.favoriteChefs.find((chef) => chef.id == id) != null
  )
  const [favoritesCount, setFavoritesCount] = useState(0)

  const toggleFavorite = async () => {
    setIsFavorited((prevIsFavorited) => !prevIsFavorited)
    setFavoritesCount((prevCount) =>
      isFavorited ? prevCount - 1 : prevCount + 1
    )

    if (isFavorited) {
      const child = favCtx.favoriteChefs.find((chef) => chef.id == id)
      const uid = localStorage.getItem('uid')
      const res = await axios.delete(
        `http://127.0.0.1:3001/api/v1/favourites/${uid}/${chefInfo._id}`
      )
      if (res.data.status === 'success') {
        favCtx.removeChefFromFavorites(child.id)
      } else {
        // ERROR HANDLING WITH MODAL
      }
    } else {
      // for now localStorage
      const uid = localStorage.getItem('uid')
      const res = await axios.put(
        `http://127.0.0.1:3001/api/v1/favourites/${uid}/${chefInfo._id}`
      )
      console.log(chefInfo)
      if (res.data.status === 'success') {
        favCtx.addChefToFavorites({
          id: id,
          chefId: chefInfo._id,
          name: chefInfo.name,
          image: chefInfo.image,
          rating: chefInfo.rating,
        })
      } else {
        // ERROR HANDLING WITH MODAL
      }
    }
  }

  return (
    <div className="bg-white p-8 mb-8 rounded-lg relative">
      <div
        className="bg-cover bg-center h-72 relative"
        style={{ backgroundImage: `url(${chef.backgroundImage})` }}
      >
        {isChef && uid == id && (
          <EditImage
            className="absolute bottom-2 right-2"
            circle={false}
            onPictureChange={() => console.log('Background picture changed')}
            onPictureRemove={() => console.log('Background picture removed')}
          />
        )}

        <img
          src={chef.profileImage}
          alt={chef.name}
          className="w-48 h-48 object-cover rounded-full border-4 border-white absolute bottom-[-90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        {isChef && uid == id && (
          <EditImage
            className="absolute bottom-[-20px] left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2"
            circle={true}
            onPictureChange={() => console.log('Profile picture changed')}
            onPictureRemove={() => console.log('Profile picture removed')}
          />
        )}
        <div className="absolute -bottom-20 right-4">
          {isFavorited ? (
            <AiFillHeart
              onClick={toggleFavorite}
              className="text-red-600 cursor-pointer scale-150"
              size="1.5em"
            />
          ) : (
            <AiOutlineHeart
              onClick={toggleFavorite}
              className="text-red-600 cursor-pointer scale-150"
              size="1.5em"
            />
          )}
          <p className="text-sm text-center scale-150">{favoritesCount}</p>
        </div>
      </div>
      <div className="mt-14">
        <h1 className="text-2xl font-bold">{chef.name}</h1>
        <p className="text-lg font-semibold opacity-80">
          {chef.distance} away - {chef.address}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-lg font-semibold opacity-80">
            <StarRating stars={chef.rating} totalVotes={chef.totalVotes} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChefProfile
