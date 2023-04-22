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
  const user = await User.findById(req.params.id)
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

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
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

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  res.status(204).json({
    status: 'success',
    data: null,
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
