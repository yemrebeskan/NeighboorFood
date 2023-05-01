import React, { useState, useEffect } from 'react'

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
  const [orderedFoods, setOrderedFoods] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const addItemToOrders = (newItem) => {
    newItem.count = 1
    setOrderedFoods((prevState) => {
      return [...prevState, newItem]
    })
  }
  const calculateTotalPrice = () => {
    let total = 0
    orderedFoods.forEach((food) => {
      total += food.price * food.count
    })
    return total
  }
  useEffect(() => {
    setTotalPrice(calculateTotalPrice())
  }, [orderedFoods])
  //setTotalPrice(calculateTotalPrice())

  const incrementCountOfFood = (itemId) => {
    const updatedFoods = orderedFoods.map((food) => {
      if (food.id === itemId) {
        food.count += 1
        return food
      }
      return food
    })
    setOrderedFoods(updatedFoods)
  }

  const decreaseCountOfFood = (itemId) => {
    const updatedFoods = orderedFoods
      .map((food) => {
        if (food.id === itemId) {
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
      prevState.filter((item) => item.id != removedItemId)
    )
  }
  const giveOrderHandler = () => {
    //burayı düzenle
    const ordered_Foods = [orderedFoods];
   
    return ordered_Foods;
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
