const User = require('../models/userModel')
const Chef = require('../models/chefModel')
const Food = require('../models/foodModel')
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
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isChef: true },
    { new: true, runValidators: true }
  )
  console.log(user)
  const newChef = new Chef({
    userInfos: user._id,
  })
  await newChef.save()
  res.status(200).json({
    status: 'success',
    data: {
      newChef,
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
    const userId = req.body.user_id
    const foodId = req.body.food_id
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
    const userId = req.user._id
    const foodId = req.body.id
    const user = await User.findById(userId)
    const food = await Food.findById(foodId)
    const updatedUser = await user.removeFromCart(food)
    res.status(202).json({
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
