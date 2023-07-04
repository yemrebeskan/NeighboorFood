import React, { useContext, useState, useEffect } from 'react'
import StarRating from './StarRating'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import EditImage from './EditImage'
import EditThumbnail from './EditThumbnail'
import FavoriteChefsContext from '../../context/FavoriteChefsContex'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// TODO: chef should come from backend
const ChefProfile = ({ isChef, chefInfo }) => {
  const chef = chefInfo

  const favCtx = useContext(FavoriteChefsContext)
  const { id } = useParams()
  const uid = localStorage.getItem('uid')

  const [isFavorited, setIsFavorited] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    let favCount = parseInt(chef.favouriteCount)
    setFavoritesCount(favCount)
  }, [])

  const [imageData, setImageData] = useState('')
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/api/v1/settings/${id}/image`
        )
        const isFavourite = favCtx.favoriteChefs.some((chef) => chef.id == id)
        setIsFavorited(isFavourite)
        setImageData(response.data)
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [])

  const [imageThumbnail, setImageThumbnail] = useState('')
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/api/v1/chefs/${id}/thumbnail`
        )
        setImageThumbnail(response.data)
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [])

  const onPictureChange = async (file) => {
    const reader = new FileReader()
    reader.onloadend = async () => {
      try {
        const base64Data = reader.result.split(',')[1]
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const response = await axios.put(
          `http://127.0.0.1:3001/api/v1/settings/${uid}/image`,
          JSON.stringify({ image: base64Data }),
          config
        )

        setImageData(response.data)
        console.log('Profile picture changed21')
      } catch (error) {
        console.log(error)
      }
    }
    reader.readAsDataURL(file)
  }

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
    <div className="bg-white sm:p-8 p-3 mb-8 rounded-lg relative">
      <div
        className="bg-cover bg-center sm:h-72 h-52 relative"
        style={{
          backgroundImage: `url(data:image/png;base64,${imageThumbnail})`,
        }}
      >
        {isChef && uid == id && (
          <EditThumbnail
            className="absolute bottom-2 right-2"
            circle={false}
            onThumbnailChange={() => {
              onThumbnailChange(), console.log('Thumbnail changed')
            }}
            onPictureRemove={async() => {try {
        const response = await axios.delete(
          `http://127.0.0.1:3001/api/v1/chefs/${uid}/thumbnail`)
             }
            catch (error) {
              setError("Error deleting thumbnail")
            }
            }}
          />
        )}
        {imageData && (
          <img
            src={`data:image/png;base64,${imageData}`}
            alt={chef.name}
            className="sm:w-48 sm:h-48 w-40 h-40 object-cover rounded-full border-4 border-white absolute sm:bottom-[-90px] bottom-[-70px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        )}

        {isChef && uid == id && (
          <EditImage
            className="absolute bottom-[-20px] left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2"
            circle={true}
            onPictureChange={() => {
              onPictureChange()
              console.log('Profile picture changed')
            }}
            onPictureRemove={() => {
              try{
              const response = axios.delete(
                `http://127.0.0.1:3001/api/v1/settings/${uid}/image`
              )
              }
              catch (error) {
                setError("Error deleting profile picture")
              }
            }}
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
        <h1 className="sm:text-2xl text-xl font-bold">{chef.name}</h1>

        <div className="flex items-center mt-2">
          <span className="sm:text-lg text-md font-semibold opacity-80">
            <StarRating stars={chef.rating} totalVotes={chef.totalVotes} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChefProfile
