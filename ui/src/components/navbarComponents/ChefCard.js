import React from 'react'
import './ChefCard.css'
import star from './star-rating-icon-4.png'
const ChefCard = (props) => {
  const handleDelete = () => {
    props.onDelete(props.id)
  }
  return (
    <div className="chefcard">
      <div className="name" >{props.name}</div>
      <div className="flex"><img className="chefPhoto" src={props.image} alt={props.name} /></div>
      <div className="chefRating"><img src={star}/>{props.rating}</div>
      <button onClick={handleDelete}> DeleteButton</button>  
    </div>
  )
}

export default ChefCard
