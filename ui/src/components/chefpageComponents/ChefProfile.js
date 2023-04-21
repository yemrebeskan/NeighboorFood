import React, { useState } from 'react';
import StarRating from './StarRating';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';


// TODO: chef should come from backend
const ChefProfile = ({ chef = {
    id: 1,
    name: 'Ally Doe',
    backgroundImage: 'https://thumbs.dreamstime.com/b/fresh-food-ingredients-vegetarian-kitchen-wooden-background-top-view-raw-vegetable-143531625.jpg',
    profileImage: 'https://www.gravatar.com/avatar/993455f0ba0ccbcfcf99819b4292c744',
    address: '123 Street, City, State, Country',
    rating: 4.5,
    totalVotes: 100,
    distance: '3.2 km',
} }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoritesCount, setFavoritesCount] = useState(0);
  
    const toggleFavorite = () => {
      setIsFavorited((prevIsFavorited) => !prevIsFavorited);
      setFavoritesCount((prevCount) => (isFavorited ? prevCount - 1 : prevCount + 1));
    };
  
    return (
      <div className="bg-white p-8 mb-8 rounded-lg relative">
        <div
          className="bg-cover bg-center h-72 relative"
          style={{ backgroundImage: `url(${chef.backgroundImage})` }}
        >
          <img
            src={chef.profileImage}
            alt={chef.name}
            className="w-48 h-48 object-cover rounded-full border-4 border-white absolute bottom-[-90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
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
    );
  };
  
  export default ChefProfile;