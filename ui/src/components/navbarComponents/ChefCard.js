import React from 'react'
import './ChefCard.css'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import StarRating from '../chefpageComponents/StarRating'

const ChefCard = (props) => {
  const handleDelete = () => {
    props.onDelete(props.id)
  }

  return (
    <div className="chefcard block">
      <div className="block">
        <button
          onClick={handleDelete}
          className="heart text-red-600 cursor-pointer scale-150 flex"
          size="1.5em"
        >
          <AiFillHeart />
        </button>
        <div className="name flex font-bold">{props.name}</div>
      </div>
      <div className="flex">
        <img className="chefPhoto" src={props.image} alt={props.name} />
      </div>
      <div className="chefRating font-bold">
        <StarRating stars={props.rating} totalVotes={props.totalVotes} />
      </div>
    </div>
  )
}

export default ChefCard
