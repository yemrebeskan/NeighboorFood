const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Order = require('../models/orderModel')
const Food = require('../models/foodModel')
const Notification = require('../models/notificationModel')

exports.makeOrder = catchAsync(async (req, res, next) => {
  const userId = req.params.id
  const { orderedFoods, chefId } = req.body

  const user = await User.findById(userId)
  const chef = await Chef.findById(chefId)
  const chefNotification = new Notification({
    message: 'You have a new order',
    to: chef.userInfos,
  })
  await chefNotification.save()
  const userNotification = new Notification({
    message: 'You have ordered menu succesfully.',
    to: userId,
  })
  await userNotification.save()
  const foodsReq = []
  orderedFoods.forEach(async (orderedFood) => {
    foodsReq.push(Food.findById(orderedFood.foodId))
  })
  const foods = await Promise.all(foodsReq)
  await user.clearCart()
  await user.save()
  const allFoods = foods.map((food, index) => {
    const orderedFood = food._id
    const quantity = orderedFoods[index].quantity
    return { orderedFood, quantity }
  })

  const ordersOfUser = await Order.findOne({ user: user, active: true })
  if (ordersOfUser) {
    return next(
      new AppError('First you should confirm your active order.', 404)
    )
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

exports.getActiveOrderForUser = catchAsync(async (req, res, next) => {
  const uid = req.params.id
  const activeOrder = await Order.findOne({ user: uid, active: true })
    .populate({
      path: 'foods.orderedFood',
      model: 'Food',
    })
    .populate({
      path: 'chef',
      model: 'Chef',
      populate: {
        path: 'userInfos',
        model: 'User',
      },
    })

  res.status(200).json({
    status: 'success',

    data: { activeOrder },
  })
})

//belki olmaz
exports.cancelOrder = catchAsync(async (req, res, next) => {
  const user = req.params.userId
  const orderId = req.params.orderId
  const order = await Order.findById(orderId).populate({
    path: 'chef',
    model: 'Chef',
  })
  if (!order) {
    return next(new AppError('No order found with that ID', 404))
  }
  if (order.user != user) {
    return next(
      new AppError('You are not authorized to cancel this order', 401)
    )
  }
  const chefNotification = new Notification({
    message: 'Order has been canceled.',
    to: order.chef.userInfos,
  })

  await chefNotification.save()

  const userNotification = new Notification({
    message: 'You have canceled your order successfully.',
    to: order.user,
  })

  await userNotification.save()
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
  const notification = new Notification({
    message: 'Your order has been accepted. It is preparing...',
    to: order.user,
  })

  await notification.save()
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
  ).populate({ path: 'user', model: 'User' })
  const notification = new Notification({
    message: 'We are upset. Your order has been rejected.',
    to: order.user._id,
  })

  await notification.save()
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
  const notification = new Notification({
    message: 'Your order has been completed successfully.',
    to: order.user,
  })

  await notification.save()
  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  })
})

exports.getPendingOrders = catchAsync(async (req, res, next) => {
  const uid = req.params.chefId
  const chef = await Chef.findOne({ userInfos: uid })
  const order = await Order.find({
    chef: chef._id,
    state: 'pending',
  })
    .populate({
      path: 'foods.orderedFood',
    })
    .populate('user') // user alanını populate et

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  })
})

exports.getAcceptedOrders = catchAsync(async (req, res, next) => {
  const uid = req.params.chefId
  const chef = await Chef.findOne({ userInfos: uid })
  const order = await Order.find({
    chef: chef._id,
    state: 'accepted',
  })
    .populate({
      path: 'foods.orderedFood',
    })
    .populate('user') // user alanını populate et

  res.status(200).json({
    status: 'success',
    data: {
      order, // orders olarak düzeltiliyor
    },
  })
})

exports.completeOrderForUser = async (req, res, next) => {
  try {
    const oid = req.params.orderId
    const updatedOrder = await Order.findByIdAndUpdate(
      oid,
      {
        active: false,
      },
      { new: true }
    )
    res.status(202).json({
      status: 'success',
      data: {
        updatedOrder, // orders olarak düzeltiliyor
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}
