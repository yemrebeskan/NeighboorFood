import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import AuthContext from './AuthContext'

const OrderedFoodContext = React.createContext({
  orderedFoods: [],
  addItemToOrders: (newItem) => {},
  removeItemFromOrders: (removedItem) => {},
  incrementCountOfFood: (itemId) => {},
  decreaseCountOfFood: (itemId) => {},
  calculateTotalPrice: () => {},
  deleteOrders: () => {},
})

export const OrderedFoodContextProvider = (props) => {
  const authCtx = useContext(AuthContext)
  const [orderedFoods, setOrderedFoods] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const addItemToOrders = (newItem) => {
    newItem.count = 1
    setOrderedFoods((prevState) => {
      return [...prevState, newItem]
    })
  }

  const calculateTotalPriceBasket = (orderedFoodsBasket) => {
    let total = 0
    orderedFoodsBasket.forEach((food) => {
      total += food.price * food.count
    })
    return total
  }

  const calculateTotalPrice = () => {
    let total = 0
    orderedFoods.forEach((food) => {
      total += food.price * food.count
    })
    return total
  }

  useEffect(() => {
    const uid = localStorage.getItem('uid')
    axios.get(`http://127.0.0.1:3001/api/v1/users/${uid}/cart`).then((res) => {
      const basketFoods = res.data.cart.foods.map((food) => {
        food.count = food.quantity
        food.name = food.foodId.name
        food.image = food.foodId.image
        food.price = food.foodId.price
        return food
      })
      setOrderedFoods(basketFoods)
      setTotalPrice(calculateTotalPriceBasket(basketFoods))
    })
  }, [authCtx.isLoggedIn, orderedFoods])
  //setTotalPrice(calculateTotalPrice())

  const incrementCountOfFood = (itemId) => {
    const updatedFoods = orderedFoods.map((food) => {
      if (food.foodId._id === itemId) {
        food.count += 1
        return food
      }
      return food
    })
    console.log(updatedFoods)
    setOrderedFoods(updatedFoods)
  }

  const decreaseCountOfFood = (itemId) => {
    const updatedFoods = orderedFoods
      .map((food) => {
        if (food.foodId._id === itemId) {
          if (food.count > 0) {
            food.count -= 1
          }
          return food
        }
        return food
      })
      .filter((food) => food.count > 0)

    setOrderedFoods(updatedFoods)
  }

  const removeItemFromOrders = (removedItemId) => {
    setOrderedFoods((prevState) =>
      prevState.filter((item) => item._id != removedItemId)
    )
  }
  const giveOrderHandler = () => {
    //burayı düzenle
    const ordered_Foods = [orderedFoods]
    return ordered_Foods
  }
  const deleteOrders = () => {
    setOrderedFoods([])
  }
  useEffect(() => {})
  //useEffect() => adding ordered items from database
  //setOrderedFoods()

  return (
    <OrderedFoodContext.Provider
      value={{
        giveOrderHandler: giveOrderHandler,
        deleteOrders: deleteOrders,
        orderedFoods: orderedFoods,
        totalPrice: totalPrice,
        addItemToOrders: addItemToOrders,
        removeItemFromOrders: removeItemFromOrders,
        incrementCountOfFood: incrementCountOfFood,
        decreaseCountOfFood: decreaseCountOfFood,
        calculateTotalPrice: calculateTotalPrice,
      }}
    >
      {props.children}
    </OrderedFoodContext.Provider>
  )
}

export default OrderedFoodContext
