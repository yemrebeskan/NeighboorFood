const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

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
  const user = await User.findById(req.user)
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.beChef = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id)
  if (user.role === 'Chef') {
    return next(new AppError('You are already a chef', 400))
  }
  user.role = 'Chef'
  await user.save({ validateBeforeSave: false })
  res.status(200).json({
    status: 'success',
    data: {
      user,
      userRole: user.role,
    },
  })
})

exports.rateChefAndComment = catchAsync(async (req, res, next) => {
  const chefId = req.params.id
  const rating = req.body.rating
  const comment = req.body.comment

  // Check if chef exists
  const chef = await User.findById(chefId)
  if (!chef) {
    return next(new AppError(`No chef found with id ${chefId}`, 404))
  }

  // Check if user is not the chef and is a customer
  const userId = req.user.id
  if (chef.id === userId || chef.role !== 'Chef') {
    return next(new AppError('You cannot rate or comment on this chef!', 400))
  }

  // Update chef's rating, ratingCount and reviews
  const newRating =
    (chef.rating * chef.ratingCount + rating) / (chef.ratingCount + 1)
  chef.rating = newRating
  chef.ratingCount = chef.ratingCount + 1
  chef.reviews.push({ name: req.user.name, rating, comment })
  await chef.save()

  res.status(200).json({
    status: 'success',
    data: {
      chef,
    },
  })
})
