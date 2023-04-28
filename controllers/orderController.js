const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Order = require('../models/orderModel')

exports.makeOrder = catchAsync(async (req, res, next) => {
  const user = req.user.id
  const chef = req.params.id
  const items = req.body.items
  const order = await Order.create({
    user: user,
    chef: chef,
    items: items,
  })

  // Add the newly created order to the user's order history
  const updatedUser = await User.findByIdAndUpdate(
    user,
    { $push: { orderHistory: order._id } },
    { new: true }
  )

  res.status(201).json({
    status: 'success',
    data: {
      order,
      user: updatedUser,
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
