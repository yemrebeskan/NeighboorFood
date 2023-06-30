const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Order = require('../models/orderModel')
const Food = require('../models/foodModel')

exports.makeOrder = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const { orderedFoods, chefId } = req.body
  const user = await User.findById(userId)
  const foodsReq = []
  orderedFoods.forEach(async (orderedFood) => {
    foodsReq.push(Food.findById(orderedFood.foodId))
  })
  const foods = await Promise.all(foodsReq)

  const allFoods = foods.map((food, index) => {
    const orderedFood = food._id
    const quantity = orderedFoods[index].quantity
    return { orderedFood, quantity }
  })

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
  const user = await User.findById(req.params.id).populate({
    path: 'orderHistory',
    model: 'Order',
    populate: {
      path: 'foods.orderedFood', // 'foods' is an array of Food references in the Menu model
      model: 'Food', // 'Food' is the model name for our foods
    },
  })
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
