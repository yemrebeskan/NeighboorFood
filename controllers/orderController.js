const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Order = require('../models/orderModel')
const Food = require('../models/foodModel')

exports.makeOrder = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const { foodIds, chefId } = req.body
  const user = await User.findById(userId)
  const foodsReq = []
  foodIds.forEach(async (foodId) => {
    foodsReq.push(Food.findById(foodId))
  })
  const foods = await Promise.all(foodsReq)
  const usedFoods = []
  const allFoods = []
  for (let i = 0; i < foods.length; i++) {
    if (
      usedFoods.some(
        (usedFoodId) => foods[i]._id.toString() === usedFoodId.toString()
      )
    ) {
      continue
    } else {
      let orderedFood = foods[i]._id
      let quantity = 1
      for (let j = 0; j < foods.length; j++) {
        if (
          foods[i]._id.toString() === foods[j]._id.toString() &&
          i !== j &&
          !usedFoods.some((usedFoodId) => foods[i]._id === usedFoodId)
        ) {
          quantity += 1
        }
      }
      usedFoods.push(foods[i]._id)
      orderedFood = foods[i]._id
      allFoods.push({ orderedFood, quantity })
    }
  }

  const newOrder = new Order({
    user: userId,
    chef: chefId,
    foods: allFoods,
  })
  await newOrder.save()
  user.orderHistory.push(newOrder)
  await user.save()
  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder,
    },
  })
})

exports.getAllOrdersForUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('orderHistory')
  const order = user.orderHistory
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    results: order.length,
    data: {
      order,
    },
  })
})

//belki olmaz
exports.cancelOrder = catchAsync(async (req, res, next) => {
  const user = req.params.userId
  const orderId = req.params.orderId
  const order = await Order.findById(orderId)
  if (!order) {
    return next(new AppError('No order found with that ID', 404))
  }
  if (order.user != user) {
    return next(
      new AppError('You are not authorized to cancel this order', 401)
    )
  }
  await Order.findByIdAndDelete(orderId)
  res.status(204).json({
    status: 'success',
    data: null,
  })
})

exports.acceptOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id
  const order = await Order.findByIdAndUpdate(
    orderId,
    { state: 'accepted' },
    { new: true }
  )
  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  })
})

exports.rejectOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id
  const order = await Order.findByIdAndUpdate(
    orderId,
    { state: 'rejected' },
    { new: true }
  )
  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  })
})

exports.completeOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      state: 'completed',
    },
    { new: true }
  )
  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  })
})

exports.getPendingOrders = catchAsync(async (req, res, next) => {
  const chefId = req.params.chefId

  const order = await Order.find({ chef: chefId, state: 'pending' }).populate({
    path: 'foods.orderedFood',
  })
  console.log(order)
  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  })
})
