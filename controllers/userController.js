const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const Food = require('../models/foodModel')
const Admin = require('../models/adminModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Application = require('../models/applicationModel')
const Notification = require('../models/notificationModel')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  })
})

exports.getUserById = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const user = await User.findById(id)
  if (!user) {
    return next(new AppError(`No user found with that ${id}`, 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.chefApply = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const aid = await Admin.findOne().select('_id')
  const userr = await User.findById(id)

  if (userr.isChef || userr.isApplied) {
    return next(new AppError('You are already a chef or already apply', 400))
  }
  const body = { ...req.body }

  const { aboutNewChef, country, streetAdress, city } = body

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isApplied: true },
    { new: true, runValidators: true }
  )
  const application = new Application({
    userInfos: user._id,
    informationAboutChef: aboutNewChef,
    country: country,
    streetAddress: streetAdress,
    city: city,
  })
  const newNotification = new Notification({
    to: aid,
    message:
      'You have a new application from ' + user.name + ' ' + user.surname,
  })
  await newNotification.save()

  await application.save()
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.rateChefAndComment = catchAsync(async (req, res, next) => {
  const chefId = req.params.chefId
  const user = req.user._id
  const rating = req.body.rating
  const comment = req.body.comment

  const chef = await Chef.findById(chefId).populate('reviews')

  const review = await Review.create({
    user: user,
    chef: chefId,
    rating: rating,
    comment: comment,
  })

  chef.ratingCount += 1
  chef.rating =
    (chef.rating * (chef.ratingCount - 1) + rating) / chef.ratingCount
  chef.reviews.push(review._id)
  await chef.save()

  res.status(200).json({
    status: 'success',
    data: {
      chef,
      reviews: chef.reviews,
      rating: chef.rating,
    },
  })
})

exports.addToCart = async (req, res) => {
  try {
    const userId = req.body.userId
    const foodId = req.body.foodId

    const user = await User.findById(userId)
    const food = await Food.findById(foodId)
    const updatedUser = await user.addToCart(food)
    res.status(202).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.params.userId
    const foodId = req.params.foodId

    const user = await User.findById(userId)
    const food = await Food.findById(foodId)

    await user.removeFromCart(food)
    res.status(204).json({
      status: 'success',
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId)
    const updatedUser = await user.clearCart()
    res.status(204).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.getCart = async (req, res) => {
  try {
    const uid = req.params.id
    const user = await User.findById(uid).populate({
      path: 'cart.foods.foodId',
      model: 'Food',
    })
    res.status(200).json({
      status: 'success',
      cart: user.cart,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.getPastOrders = async (req, res) => {
  try {
    const uid = req.params.id
    const user = await User.findById(uid)
      .populate({
        path: 'orderHistory',
        model: 'Order',
        populate: {
          path: 'foods.orderedFood', // 'foods' is an array of Food references in the Menu model
          model: 'Food', // 'Food' is the model name for our foods
        },
      })
      .populate({
        path: 'orderHistory',
        model: 'Order',
        populate: {
          path: 'chef',
          model: 'Chef',
          populate: {
            path: 'userInfos',
            model: 'User',
            select: 'name surname',
          },
        },
      })
    console.log(user.orderHistory)

    res.status(200).json({
      status: 'success',
      orderHistory: user.orderHistory,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.getNotifications = async (req, res, next) => {
  try {
    const uid = req.params.id

    const notifications = await Notification.find({ to: uid })
    res.status(200).json({
      status: 'success',
      notifications: notifications,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.deleteNotification = async (req, res, next) => {
  try {
    const nid = req.params.nid
    const notification = await Notification.findByIdAndRemove(nid)
    res.status(200).json({
      status: 'success',
      notifications: notification,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.deleteNotifications = async (req, res, next) => {
  try {
    const uid = req.params.uid
    const notifications = await Notification.deleteMany({ userInfos: uid })
    res.status(200).json({
      status: 'success',
      notifications: notifications,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}
